import { Buyer } from "./types";

export async function fetchBuyers(): Promise<Buyer[]> {
    return [
        {
            id: 1,
            name: 'John Doe',
            company: 'Unknown Pals'
        },
        {
            id: 2,
            name: 'Jen Doe',
            company: 'Unknown Pals'
        },
        {
            id: 3,
            name: 'Eric Mirion',
            company: 'Zara'
        }
    ]
}