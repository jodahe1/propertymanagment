import { QueryOptions } from "@shared/shared-kernel";
export class GetAllRoomsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
