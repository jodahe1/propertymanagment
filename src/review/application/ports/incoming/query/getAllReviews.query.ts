import { QueryOptions } from "@shared/shared-kernel";
export class GetAllReviewsQuery {
  constructor(   
    public readonly queryOptions?: QueryOptions,
  ) {}
}
