export class UpdateRoomCommand {
    constructor(
        public readonly id: string,
        public readonly roomTypeId: string,
        public readonly roomNumber: string,
        public readonly floor: number,
        public readonly status: string,
        public readonly lastCleanedAt?: Date,
        public readonly notes?: string,
        public readonly isActive?: boolean,
    ) { }
}
