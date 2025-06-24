import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsValidRoleNameConstraint implements ValidatorConstraintInterface {
  validate(roleName: string, args: ValidationArguments) {
    const allowedRoles = ['admin', 'user', 'teacher', 'student'];
    return allowedRoles.includes(roleName.toLowerCase());
  }

  defaultMessage(args: ValidationArguments) {
    return 'Role name must be one of: admin, user, teacher, student';
  }
}

@ValidatorConstraint({ async: false })
export class IsValidEmailDomainConstraint implements ValidatorConstraintInterface {
  validate(email: string, args: ValidationArguments) {
    if (!email) return false;
    const allowedDomains = ['gmail.com', 'yahoo.com', 'school.edu'];
    const domain = email.split('@')[1];
    return allowedDomains.includes(domain);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Email must be from an allowed domain (gmail.com, company.com, school.edu)';
  }
}

@ValidatorConstraint({ async: false })
export class IsValidPaginationLimitConstraint implements ValidatorConstraintInterface {
  validate(limit: number, args: ValidationArguments) {
    return limit >= 1 && limit <= 100;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Pagination limit must be between 1 and 100';
  }
}

export function IsValidRoleName(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidRoleNameConstraint,
    });
  };
}

export function IsValidEmailDomain(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidEmailDomainConstraint,
    });
  };
}

export function IsValidPaginationLimit(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidPaginationLimitConstraint,
    });
  };
} 