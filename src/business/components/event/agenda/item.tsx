import { MouseEvent } from "react";
import { ApiEvent } from "../../../../api/types";
import { getNumberOfSlots, getOpeningDatetime } from "../../../../technical/helpers/date";
import { slotSize } from "./utils";

interface EventAgendaItemProps {
    event: ApiEvent;
    onRightClick: (e: MouseEvent<HTMLAnchorElement>, event: ApiEvent) => void;
}

export default function EventAgendaItem({ event, onRightClick }: EventAgendaItemProps) {
    const nbSlotsForEvent = getNumberOfSlots(event.startDatetime, event.endDatetime);
    const nbSlotsFromOpening = getNumberOfSlots(getOpeningDatetime(event.startDatetime), event.startDatetime);
    return <a
        className={`box-border block absolute w-64 ml-16 px-4 py-2 text-white bg-teal-500 hover:bg-teal-700 border-2 border-teal-200 rounded-sm z-10 cursor-help`}
        style={{
            top: slotSize(nbSlotsFromOpening),
            height: slotSize(nbSlotsForEvent),
        }}
        onContextMenu={(e) => onRightClick(e, event)}
    >
        {event.title}
    </a>
}