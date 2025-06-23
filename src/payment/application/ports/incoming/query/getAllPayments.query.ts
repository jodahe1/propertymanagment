import { QueryOptions } from "@shared/shared-kernel";
export class GetAllPaymentsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
