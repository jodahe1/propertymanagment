import { Provider } from "@nestjs/common";
import { CreateServiceproductUseCase } from "./createServiceproductUseCase";
import { GetAllServiceproductsUseCase } from "./getAllServiceproductsUseCase";
import { GetServiceproductByIdUseCase } from "./getServiceproductByIdUseCase";
import { DeleteServiceproductUseCase } from "./deleteServiceproductUseCase";
import { UpdateServiceproductUseCase } from "./updateServiceproductUseCase";

export const ServiceproductUseCases: Provider[] = [CreateServiceproductUseCase, GetAllServiceproductsUseCase, GetServiceproductByIdUseCase, DeleteServiceproductUseCase, UpdateServiceproductUseCase];
