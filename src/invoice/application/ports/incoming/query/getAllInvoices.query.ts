import { QueryOptions } from "@shared/shared-kernel";
export class GetAllInvoicesQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
