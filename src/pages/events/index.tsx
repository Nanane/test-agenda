import { addDays, subDays } from "date-fns";
import format from "date-fns/format";
import { useCallback, useEffect, useState } from "react";
import { useToggle } from "react-use";
import { fetchEvents } from "../../api/event";
import { ApiEvent } from "../../api/types";
import EventAgenda from "../../business/components/event/agenda";
import EventForm from "../../business/components/event/form";
import Modal from "../../ui/modal";

export default function EventsPage() {
    const [ events, setEvents ] = useState<ApiEvent[]>([]);
    const [ currentDate, setCurrentDate ] = useState(new Date());
    const [ modalIsOpen, toggleModal ] = useToggle(false); // event creation modal

    // function to refresh events
    const refreshEvents = useCallback(() => fetchEvents(currentDate).then(setEvents), [currentDate]);

    // refresh events when date changes
    useEffect(() => {refreshEvents()}, [currentDate]);

    // handlers
    const handleGoToPrevDay = () => {
        setCurrentDate(subDays(currentDate, 1))
        refreshEvents()
    }

    const handleGoToNextDay = () => {
        setCurrentDate(addDays(currentDate, 1))
        refreshEvents()
    }

    const handleEventCreated = () => {
        toggleModal()
        refreshEvents()
    }

    return (
        <div className="mx-auto w-96">
            <h1 className="mt-8 text-xl font-bold mb-4">Events for <input type="date" value={format(currentDate, 'yyyy-MM-dd')} onChange={(e) => setCurrentDate(new Date(e.target.value))}/></h1>
            <button
                onClick={toggleModal}
                className="p-2 my-4 block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center"
                data-testid="btn-show-create-event-modal"
            >
                + Create Appointment
            </button>    
            <button
            className="p-2 text-white bg-slate-500 hover:bg-slate-400 font-medium rounded-lg text-sm text-center"
            onClick={handleGoToPrevDay}
            >
                &lt; Previous day
            </button>
            <button className="p-2 float-right text-white bg-slate-500 hover:bg-slate-400 font-medium rounded-lg text-sm text-center" onClick={handleGoToNextDay}>Next day &gt;</button>
            <EventAgenda
                events={events}
                onEventsDeleted={refreshEvents}
            />
            {/** Modal for creating an appointment */}
            <Modal isOpen={modalIsOpen} onHide={toggleModal}>
                <h1 className="text-lg font-bold">Book an appointment</h1>
                <EventForm onSubmit={handleEventCreated} forDate={currentDate} />
            </Modal>
        </div>
    );
}