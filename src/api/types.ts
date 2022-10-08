export interface ApiEvent {
    id: number;
    buyerId: Buyer['id'];
    vendorId: Vendor['id'];
    title: string;
    startDatetime: Date;
    endDatetime: Date;
}

export interface Buyer {
    id: number;
    name: string;
    company: string;
}

export interface Vendor {
    id: number;
    name: string;
}
