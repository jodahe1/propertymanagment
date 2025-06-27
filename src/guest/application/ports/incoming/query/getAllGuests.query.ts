import { QueryOptions } from "@shared/shared-kernel";
export class GetAllGuestsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
