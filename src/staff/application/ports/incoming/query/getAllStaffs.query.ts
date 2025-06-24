import { QueryOptions } from "@shared/shared-kernel";
export class GetAllStaffsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
