import { MouseEvent, useState } from "react";
import { deleteEvent } from "../../../../api/event";
import { ApiEvent } from "../../../../api/types";
import { getNumberOfSlots, getOpeningDatetime } from "../../../../technical/helpers/date";
import { useContextMenu } from "../../../../technical/helpers/contextMenu";
import Button from "../../../../ui/button";
import { slotSize } from "./utils";
import EventAgendaItem from "./item";


const AGENDA_SCALE = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

interface EventAgendaProps {
    events: ApiEvent[];
    onEventsDeleted: () => void;
}

export default function EventAgenda({
    events,
    onEventsDeleted
}: EventAgendaProps) {
    const [ selectedEvent, setSelectedEvent ] = useState<ApiEvent[]>([]);
    const contextMenu = useContextMenu(); // context menu for actions on events displayed

    const handleEventRightClick = (e: MouseEvent<any,any>, event: ApiEvent) => {
        e.preventDefault();
        setSelectedEvent([event]);
        contextMenu.updateOrShow();
    }

    const handleSelectedEventDelete = () => {
        Promise.all(selectedEvent.map(deleteEvent))
            .then(() => setSelectedEvent([]))
            .then(onEventsDeleted);
        contextMenu.hide();
    }

    return (
        <>
            <div className="relative mt-8">
                <div className="divide-y divide-slate-300">
                    {/** Agenda background - relative positioning*/}
                    {AGENDA_SCALE.map((graduation, index) => (
                        <div
                            key={`graduation-${index}`}
                            className={`block h-slot-4 text-slate-400 border-t border-slate-300`}
                        >
                            {graduation}
                        </div>
                        )
                    )}
                </div>
                {/** Events - absolute positioning */}
                {events.map(event => <EventAgendaItem key={`event-${event.id}`} event={event} onRightClick={handleEventRightClick} />)}
            </div>
            {/** event contextual menu */}
            <div ref={contextMenu.ref} className="w-48 absolute z-20 p-1 bg-slate-200 rounded-md drop-shadow-lg border border-slate-400 border-outset" style={{ display: (contextMenu.isOpen ? 'block' : 'none'), top: contextMenu.top, left: contextMenu.left }}>
                <p className="text-slate-500 px-2 mb-2 border-b border-slate-300">Actions</p>
                <Button theme="danger" className="border-box w-full rounded-md" onClick={handleSelectedEventDelete}>x Delete</Button>
            </div>
        </>
    )
}