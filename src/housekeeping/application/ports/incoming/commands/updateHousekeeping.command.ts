export class UpdateHousekeepingCommand {
    constructor(
        public readonly id: string,
        public readonly roomId: string,
        public readonly staffId: string,
        public readonly status: string,
        public readonly notes?: string,
        public readonly completedAt?: Date,
        public readonly isActive?: boolean,
    ) { }
}
