import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { CreateGuestCommand } from "../ports/incoming";
import { TGuestRepository } from "../ports/outgoing/guest.repository";
import { GuestResponseDto } from "src/guest/presentation/http/dto";
import { GuestMapper } from "../mappers";

@CommandHandler(CreateGuestCommand)
export class CreateGuestUseCase implements ICommandHandler<CreateGuestCommand> {
  constructor(
    private readonly guestRepository: TGuestRepository,
  ) { }

  async execute(command: CreateGuestCommand): Promise<GuestResponseDto> {
    const createdGuest = await this.guestRepository.create(GuestMapper.createCommandToDomain(command));
    return GuestMapper.toResponseDto(createdGuest);
  }
}
