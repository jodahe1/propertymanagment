import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateServiceproductCommand } from "../ports/incoming";
import { TServiceproductRepository } from "../ports/outgoing/serviceproduct.repository";
import { ServiceproductResponseDto } from "src/serviceproduct/presentation/http/dto";
import { ServiceproductMapper } from "../mappers";

@CommandHandler(CreateServiceproductCommand)
export class CreateServiceproductUseCase implements ICommandHandler<CreateServiceproductCommand> {
  constructor(
    private readonly serviceproductRepository: TServiceproductRepository,
  ) { }

  async execute(command: CreateServiceproductCommand): Promise<ServiceproductResponseDto> {
    const createdServiceproduct = await this.serviceproductRepository.create(ServiceproductMapper.createCommandToDomain(command));
    return ServiceproductMapper.toResponseDto(createdServiceproduct);
  }
}
