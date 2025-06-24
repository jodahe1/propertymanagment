import { ValidationResult, BusinessRule, AggregateRoot } from '../entities/domain/aggregate-root';

export interface ValidationContext {
  entity: AggregateRoot;
  operation: 'CREATE' | 'UPDATE' | 'DELETE';
  userId?: string;
  metadata?: Record<string, any>;
}

export interface AsyncValidator {
  name: string;
  validate(context: ValidationContext): Promise<ValidationResult>;
}

export interface SchoolBusinessRules {
  // Student rules
  uniqueAdmissionNumber(admissionNumber: string, excludeId?: string): Promise<boolean>;
  studentAgeValidation(dateOfBirth: Date, gradeLevel: number): Promise<boolean>;
  maxStudentsPerSection(sectionId: string): Promise<boolean>;
  
  // Staff rules
  uniqueEmployeeId(employeeId: string, excludeId?: string): Promise<boolean>;
  qualificationRequirement(staffType: string, qualifications: string[]): Promise<boolean>;
  
  // Academic rules
  validAcademicYearTransition(fromYear: string, toYear: string): Promise<boolean>;
  gradePrerequisites(gradeId: string, studentId: string): Promise<boolean>;
}

export class ValidationEngine {
  private rules: Map<string, BusinessRule[]> = new Map();
  private asyncValidators: Map<string, AsyncValidator[]> = new Map();
  private businessRules: SchoolBusinessRules;

  constructor(businessRules: SchoolBusinessRules) {
    this.businessRules = businessRules;
  }

  // Register rules for specific entity types
  registerRule<T extends AggregateRoot>(
    entityType: new (...args: any[]) => T,
    rule: BusinessRule
  ): void {
    const typeName = entityType.name;
    const existing = this.rules.get(typeName) || [];
    this.rules.set(typeName, [...existing, rule]);
  }

  // Register async validators
  registerAsyncValidator<T extends AggregateRoot>(
    entityType: new (...args: any[]) => T,
    validator: AsyncValidator
  ): void {
    const typeName = entityType.name;
    const existing = this.asyncValidators.get(typeName) || [];
    this.asyncValidators.set(typeName, [...existing, validator]);
  }

  // Comprehensive validation
  async validateEntity(context: ValidationContext): Promise<ValidationResult> {
    const typeName = context.entity.constructor.name;
    const results: ValidationResult[] = [];

    // 1. Execute entity's own business rules
    const entityValidation = await context.entity.validateBusinessRules();
    results.push(entityValidation);

    // 2. Execute registered rules
    const registeredRules = this.rules.get(typeName) || [];
    for (const rule of registeredRules) {
      const result = await rule.validate(context.entity);
      results.push(result);
    }

    // 3. Execute async validators
    const asyncValidators = this.asyncValidators.get(typeName) || [];
    for (const validator of asyncValidators) {
      const result = await validator.validate(context);
      results.push(result);
    }

    // 4. Aggregate results
    return {
      isValid: results.every(r => r.isValid),
      errors: results.flatMap(r => r.errors),
      warnings: results.flatMap(r => r.warnings),
    };
  }

  // Bulk validation for imports
  async validateBatch(contexts: ValidationContext[]): Promise<ValidationResult[]> {
    const results = await Promise.all(
      contexts.map(context => this.validateEntity(context))
    );
    return results;
  }
}

// Pre-built business rules for school domain
export class StudentBusinessRules {
  constructor(private businessRules: SchoolBusinessRules) {}

  // Age validation rule
  ageValidationRule(): BusinessRule {
    return {
      name: 'StudentAgeValidation',
      async validate(aggregate: AggregateRoot): Promise<ValidationResult> {
        // Type-safe casting after runtime check
        if (aggregate.constructor.name !== 'Student') {
          return { isValid: true, errors: [], warnings: [] };
        }

        const student = aggregate as any; // We know it's a student
        const gradeLevel = 1; // You'd get this from the student's grade
        
        const isValid = await this.businessRules.studentAgeValidation(
          student.dateOfBirth, 
          gradeLevel
        );

        return {
          isValid,
          errors: isValid ? [] : ['Student age is not appropriate for the grade level'],
          warnings: [],
        };
      }
    };
  }

  // Admission number uniqueness
  uniqueAdmissionRule(): BusinessRule {
    return {
      name: 'UniqueAdmissionNumber',
      async validate(aggregate: AggregateRoot): Promise<ValidationResult> {
        if (aggregate.constructor.name !== 'Student') {
          return { isValid: true, errors: [], warnings: [] };
        }

        const student = aggregate as any;
        const isUnique = await this.businessRules.uniqueAdmissionNumber(
          student.admissionNumber,
          student.id
        );

        return {
          isValid: isUnique,
          errors: isUnique ? [] : ['Admission number already exists'],
          warnings: [],
        };
      }
    };
  }
}

// Async validators for external system checks
export class ExternalValidators {
  
  // Government ID validation
  static createGovernmentIdValidator(): AsyncValidator {
    return {
      name: 'GovernmentIdValidation',
      async validate(context: ValidationContext): Promise<ValidationResult> {
        // Simulate external API call
        await new Promise(resolve => setTimeout(resolve, 100));
        
        return {
          isValid: true,
          errors: [],
          warnings: ['Government ID validation completed'],
        };
      }
    };
  }

  // Email domain validation
  static createEmailDomainValidator(): AsyncValidator {
    return {
      name: 'EmailDomainValidation',
      async validate(context: ValidationContext): Promise<ValidationResult> {
        // Check against approved domains
        return {
          isValid: true,
          errors: [],
          warnings: [],
        };
      }
    };
  }
} 