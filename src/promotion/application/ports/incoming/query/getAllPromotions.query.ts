import { QueryOptions } from "@shared/shared-kernel";
export class GetAllPromotionsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
