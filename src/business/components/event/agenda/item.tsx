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

    let classNames = '';
    switch (true) {
        case nbSlotsForEvent === 1 :
            classNames = 'text-xs';
            break;
        case nbSlotsForEvent === 2 :
            classNames = 'py-px text-sm';
            break;
        default :
            classNames = 'py-2';
            break;
    }

    return <a
        className={`${classNames} align-middle box-border block absolute w-64 ml-16 px-4 text-white bg-teal-500 hover:bg-teal-700 border border-teal-600 rounded-md z-10 cursor-help`}
        style={{
            top: slotSize(nbSlotsFromOpening),
            height: slotSize(nbSlotsForEvent),
        }}
        onContextMenu={(e) => onRightClick(e, event)}
    >
        {event.title}
    </a>
}