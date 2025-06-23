export class CreateRoomCommand {
    constructor(
        public readonly roomTypeId: string,
        public readonly roomNumber: string,
        public readonly floor: number,
        public readonly status: string,
        public readonly lastCleanedAt?: Date,
        public readonly notes?: string,
        public readonly isActive?: boolean,
    ) { }
}
