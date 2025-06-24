import { QueryOptions } from "@shared/shared-kernel";
export class GetAllExpensesQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
