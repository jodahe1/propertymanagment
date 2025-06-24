import { QueryOptions } from "@shared/shared-kernel";
export class GetAllHousekeepingsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
