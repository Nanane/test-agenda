export interface ApiEvent {
    id: number;
    buyerId: ApiBuyer['id'];
    vendorId: ApiVendor['id'];
    title: string;
    startDatetime: Date;
    endDatetime: Date;
}

export interface ApiBuyer {
    id: number;
    name: string;
    company: string;
}

export interface ApiVendor {
    id: number;
    name: string;
}
