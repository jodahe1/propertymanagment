import { Provider } from "@nestjs/common";
import { CreateReviewUseCase } from "./createReviewUseCase";
import { GetAllReviewsUseCase } from "./getAllReviewsUseCase";
import { GetReviewByIdUseCase } from "./getReviewByIdUseCase";
import { DeleteReviewUseCase } from "./deleteReviewUseCase";
import { UpdateReviewUseCase } from "./updateReviewUseCase";

export const ReviewUseCases: Provider[] = [CreateReviewUseCase, GetAllReviewsUseCase, GetReviewByIdUseCase, DeleteReviewUseCase, UpdateReviewUseCase];
