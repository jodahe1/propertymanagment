export class UpdateRoomCommand {
    constructor(
        public readonly id: string,
        public readonly hotel_id: string,
        public readonly room_type_id: string,
        public readonly room_number: string,
        public readonly floor_number?: number,
        public readonly availability_status: string,
        public readonly current_price: number,
        public readonly notes?: string,
        public readonly isActive?: boolean,
    ) { }
}
