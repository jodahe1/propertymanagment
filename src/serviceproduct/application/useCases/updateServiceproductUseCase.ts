import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateServiceproductCommand } from "../ports/incoming";
import { TServiceproductRepository } from "../ports/outgoing/serviceproduct.repository";
import { ServiceproductResponseDto } from "src/serviceproduct/presentation/http/dto";
import { ServiceproductMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateServiceproductCommand)
export class UpdateServiceproductUseCase implements ICommandHandler<UpdateServiceproductCommand> {
    constructor(
        private readonly serviceproductRepository: TServiceproductRepository,
    ) { }
    
    async execute(command: UpdateServiceproductCommand): Promise<ServiceproductResponseDto> {
        const serviceproduct = await this.serviceproductRepository.findById(command.id);
        if (!serviceproduct) {
            throw new NotFoundException(`Serviceproduct with id ${command.id} not found`);
        }
          const updatedServiceproduct = await this.serviceproductRepository.update(command.id, ServiceproductMapper.updateCommandToDomain(command, serviceproduct));
        return ServiceproductMapper.toResponseDto(updatedServiceproduct);
    }
}
