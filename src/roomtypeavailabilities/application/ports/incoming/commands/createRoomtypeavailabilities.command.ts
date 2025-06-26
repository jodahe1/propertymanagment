import { BlockedReason } from 'src/roomtypeavailabilities/domain/valueObjects/blocked-reason.enum';
export class CreateRoomtypeavailabilitiesCommand {
  constructor(
    public readonly roomTypeId: string,
    public readonly date: string,
    public readonly availableQuantity: number,
    public readonly priceModifier?: number,
    public readonly minStayNights?: number,
    public readonly maxStayNights?: number,
    public readonly blockedReason?: BlockedReason,
    public readonly isActive?: boolean,
  ) {}
}
