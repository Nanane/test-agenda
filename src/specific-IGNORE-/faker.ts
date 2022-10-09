import { faker } from "@faker-js/faker";

export function generateFakeId() {
    return parseInt(faker.random.numeric(6));
}