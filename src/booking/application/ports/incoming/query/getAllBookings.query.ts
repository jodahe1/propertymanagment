import { QueryOptions } from "@shared/shared-kernel";
export class GetAllBookingsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
