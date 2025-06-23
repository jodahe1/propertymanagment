import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UpdateGuestCommand } from "../ports/incoming";
import { TGuestRepository } from "../ports/outgoing/guest.repository";
import { GuestResponseDto } from "src/guest/presentation/http/dto";
import { GuestMapper } from "../mappers";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(UpdateGuestCommand)
export class UpdateGuestUseCase implements ICommandHandler<UpdateGuestCommand> {
    constructor(
        private readonly guestRepository: TGuestRepository,
    ) { }
    
    async execute(command: UpdateGuestCommand): Promise<GuestResponseDto> {
        const guest = await this.guestRepository.findById(command.id);
        if (!guest) {
            throw new NotFoundException(`Guest with id ${command.id} not found`);
        }
          const updatedGuest = await this.guestRepository.update(command.id, GuestMapper.updateCommandToDomain(command, guest));
        return GuestMapper.toResponseDto(updatedGuest);
    }
}
