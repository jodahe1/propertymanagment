import { QueryOptions } from "@shared/shared-kernel";
export class GetAllRateplansQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
