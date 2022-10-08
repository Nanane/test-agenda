import { Vendor } from "./types";

export async function fetchVendors(): Promise<Vendor[]> {
    return [
        {
            id: 1,
            name: 'Vendor 1',
        },
        {
            id: 2,
            name: 'Vendor 2',
        },
        {
            id: 3,
            name: 'Vendor 3',
        }
    ]
}