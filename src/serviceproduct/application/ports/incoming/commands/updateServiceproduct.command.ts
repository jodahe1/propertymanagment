export class UpdateServiceproductCommand {
    constructor(
        public readonly id: string,
        public readonly hotelId: string,
        public readonly name: string,
        public readonly description?: string,
        public readonly price: number,
        public readonly currency: string,
        public readonly status: string,
        public readonly isActive?: boolean,
    ) { }
}
