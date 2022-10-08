import { formatRelative } from "date-fns";
import format from "date-fns/format";
import { useState } from "react";
import EventForm from "../../components/event/form";
import useModal from "../../hooks/modal";
import Modal from "../../ui/modal";

const AGENDA_SCALE = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
const HEIGHT_PER_SLOT = 15; // 15px per 15min slot


const graduationStyle: (index:number) => React.HTMLAttributes<HTMLDivElement>['style'] = (index) => ({
    height: HEIGHT_PER_SLOT * 4,
    borderTop: '1px solid lightgrey',
    fontSize: 12,
    color: 'darkgrey',
});


export default function Events() {
    const modal = useModal();
    const [ currentDate, setCurrentDate ] = useState(new Date());

    return (
        <div className="mx-auto w-96">
            <h1 className="mt-8 text-xl font-bold mb-4">Events for <input type="date" value={format(currentDate, 'yyyy-MM-dd')} /></h1>
            
            <button onClick={modal.show} className="p-2 block text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm text-center" data-testid="btn-show-create-event-modal">+ Create Appointment</button>    
            <div className="relative mt-8">
                {/** Agenda background */}
                {AGENDA_SCALE.map((graduation, index) => (
                    <div key={`graduation-${index}`} style={graduationStyle(index)}>{graduation}</div>)
                )}
                {/** events */}
            </div>
            <Modal isOpen={modal.isOpen} onHide={modal.hide}>
                <h1 className="text-lg font-bold">Book an appointment</h1>
                <EventForm onSubmit={modal.hide} forDate={currentDate}/>
            </Modal>
        </div>
    );
}