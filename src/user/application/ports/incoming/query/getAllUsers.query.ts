import { QueryOptions } from "@shared/shared-kernel";
export class GetAllUsersQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
