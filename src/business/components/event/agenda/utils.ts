/**
 * Gives the size representing a certain amount of time slots
 * @param nbSlots the number of slots we want to calculate
 * @returns string in the format (ex: "45px", "15px", ...)
 */
export function slotSize(nbSlots: number = 1) {
    return `${nbSlots * 15}px`
}
