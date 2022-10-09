import { faker } from "@faker-js/faker";
import { addDays, subDays } from "date-fns";
import format from "date-fns/format";
import { MouseEvent, useCallback, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { deleteEvent, fetchEvents } from "../../api/event";
import { ApiEvent } from "../../api/types";
import EventForm from "../../components/event/form";
import { getNumberOfSlots, getOpeningDatetime } from "../../helpers/date";
import { useContextMenu } from "../../helpers/hooks/contextMenu";
import Modal from "../../ui/modal";


const AGENDA_SCALE = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];

/**
 * Gives the size representing a certain amount of time slots
 * @param nbSlots the number of slots we want to calculate
 * @returns string in the format (ex: "45px", "15px", ...)
 */
function slotSize(nbSlots: number = 1) {
    return `${nbSlots * 15}px`
}

export default function Events() {
    const [ events, setEvents ] = useState<ApiEvent[]>([]);
    const [ selectedEvent, setSelectedEvent ] = useState<ApiEvent[]>([]);
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ modalIsOpen, toggleModal ] = useToggle(false); // event creation modal
    const contextMenu = useContextMenu(); // context menu for actions on events displayed

    const refreshEvents = useCallback(() => fetchEvents(currentDate).then(setEvents), [currentDate]);
    useEffect(() => {refreshEvents()}, [currentDate]);

    const handleGoToPrevDay = () => {
        setCurrentDate(subDays(currentDate, 1));
        refreshEvents
    }

    const handleGoToNextDay = () => {
        setCurrentDate(addDays(currentDate, 1));
        refreshEvents
    }

    const handleEventRightClick = (e: MouseEvent<any,any>, event: ApiEvent) => {
        e.preventDefault();
        setSelectedEvent([event]);
        contextMenu.updateOrShow();
    }

    const handleSelectedEventDelete = () => {
        Promise.all(selectedEvent.map(deleteEvent))
            .then(() => setSelectedEvent([]))
            .then(() => refreshEvents());
        contextMenu.hide();
    }

    return (
        <div className="mx-auto w-96">
            <h1 className="mt-8 text-xl font-bold mb-4">Events for <input type="date" value={format(currentDate, 'yyyy-MM-dd')} onChange={() => {}}/></h1>
            <button onClick={toggleModal} className="p-2 my-4 block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center" data-testid="btn-show-create-event-modal">+ Create Appointment</button>    
            <button className="p-2 text-white bg-slate-300 hover:bg-slate-800 font-medium rounded-lg text-sm text-center" onClick={handleGoToPrevDay}>&lt; Previous day</button>
            <button className="p-2 float-right text-white bg-slate-300 hover:bg-slate-800 font-medium rounded-lg text-sm text-center" onClick={handleGoToNextDay}>Next day &gt;</button>
            <div className="relative mt-8 divide-y divide-slate-300">
                <>
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
                {/** Events - absolute positioning */}
                {events.map(event => {
                    const nbSlotsForEvent = getNumberOfSlots(event.startDatetime, event.endDatetime);
                    const nbSlotsFromOpening = getNumberOfSlots(getOpeningDatetime(event.startDatetime), event.startDatetime);
                    return <div
                        key={`event-${event.id}`}
                        className={`cursor-help bg-teal-500 ml-16 box-border px-4 py-2 text-white w-full absolute rounded-sm z-10`}
                        style={{
                            top: slotSize(nbSlotsFromOpening),
                            height: slotSize(nbSlotsForEvent),
                        }}
                        onContextMenu={(e) => handleEventRightClick(e, event)}
                    >
                        {event.title}
                    </div>
                })}
                </>
            </div>
            {/** Modal for creating an appointment */}
            <Modal isOpen={modalIsOpen} onHide={toggleModal}>
                <h1 className="text-lg font-bold">Book an appointment</h1>
                <EventForm onSubmit={() => {
                    toggleModal(); refreshEvents();
                }} forDate={currentDate}/>
            </Modal>
            {/** event contextual menu */}
            <div ref={contextMenu.ref} className="w-24 absolute z-20 p-1 bg-slate-200 rounded-md drop-shadow-lg border-8 border-slate-400 border-outset" style={{ display: (contextMenu.isOpen ? 'block' : 'none'), top: contextMenu.top, left: contextMenu.left }}>
                <span className="text-slate-500">Actions</span>
                <hr className="my-1"/>
                <button className="border-box w-full p-2 text-white bg-red-600 hover:bg-red-700 font-medium text-sm text-center" onClick={handleSelectedEventDelete}>x Delete</button>
            </div>
        </div>
    );
}