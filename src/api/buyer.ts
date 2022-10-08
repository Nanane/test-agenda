import { ApiBuyer } from "./types";

export async function fetchBuyers(): Promise<ApiBuyer[]> {
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