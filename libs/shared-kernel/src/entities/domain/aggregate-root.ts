import { Entity } from './entity';

export interface DomainEvent {
  eventId: string;
  eventType: string;
  aggregateId: string;
  aggregateType: string;
  eventVersion: number;
  eventData: Record<string, any>;
  occurredAt: Date;
  causedBy?: string;
}

export interface BusinessRule {
  name: string;
  validate(aggregate: AggregateRoot): Promise<ValidationResult>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export abstract class AggregateRoot extends Entity {
  private _domainEvents: DomainEvent[] = [];
  private _version: number = 0;
  
  get version(): number { return this._version; }
  get domainEvents(): DomainEvent[] { return [...this._domainEvents]; }

  protected addDomainEvent(event: Omit<DomainEvent, 'eventId' | 'aggregateId' | 'aggregateType' | 'occurredAt'>): void {
    const domainEvent: DomainEvent = {
      eventId: crypto.randomUUID(),
      aggregateId: this.id,
      aggregateType: this.constructor.name,
      occurredAt: new Date(),
      ...event,
    };
    
    this._domainEvents.push(domainEvent);
    this._version++;
  }

  public clearDomainEvents(): void {
    this._domainEvents = [];
  }

  // Enterprise validation framework
  protected abstract getBusinessRules(): BusinessRule[];
  
  public async validateBusinessRules(): Promise<ValidationResult> {
    const rules = this.getBusinessRules();
    const results: ValidationResult[] = [];
    
    for (const rule of rules) {
      const result = await rule.validate(this);
      results.push(result);
    }
    
    return {
      isValid: results.every(r => r.isValid),
      errors: results.flatMap(r => r.errors),
      warnings: results.flatMap(r => r.warnings),
    };
  }

  public incrementVersion(): void {
    this._version++;
  }
} 