import { QueryOptions } from "@shared/shared-kernel";
export class GetAllHotelsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
