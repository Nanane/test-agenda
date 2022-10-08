import format from "date-fns/format";
import React from "react";
import { fetchBuyers } from "../../api/buyer";
import { createEvent } from "../../api/event";
import { ApiEvent, Buyer, Vendor } from "../../api/types";
import { fetchVendors } from "../../api/vendor";
import { CLOSING_HOUR, CLOSING_MINUTE, OPENING_HOUR, OPENING_MINUTE } from "../../constants";
import { getTimeSlots } from "../../helpers/date";
import { formDataToJSON } from "../../helpers/form";
import { useApi } from "../../hooks/api";

interface EventFormProps {
    onSubmit: (event: ApiEvent) => void;
    forDate: Date;
}

export default function EventForm({ onSubmit, forDate }: EventFormProps) {
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        const formData = formDataToJSON(new FormData(e.currentTarget));
        const title = formData.title;
        const buyerId = formData.buyerId;
        const vendorId = formData.vendorId;
        const startTime = formData.startTime;
        const endTime = formData.endTime;

        // validation
        if (title === undefined || vendorId === undefined || buyerId === undefined ||startTime === undefined || endTime === undefined) {
            throw new Error('form invalid');
        }

        // parse startTime input
        const startHour = parseInt(startTime.split(':')[0]);
        const startMinute = parseInt(startTime.split(':')[1]);
        const startDatetime = new Date(forDate);
        startDatetime.setHours(startHour, startMinute, 0, 0);
        // parse endTime input
        const endHour = parseInt(endTime.split(':')[0]);
        const endMinute = parseInt(endTime.split(':')[1]);
        const endDatetime = new Date(forDate);
        endDatetime.setHours(endHour, endMinute, 0, 0);

        return createEvent({
            title,
            buyerId: parseInt(buyerId),
            vendorId: parseInt(vendorId),
            startDatetime,
            endDatetime,
        }).then(onSubmit)
    }

    const vendors = useApi<Vendor[]>({ fetchFunc: fetchVendors, initialValue: []});
    const buyers = useApi<Buyer[]>({ fetchFunc: fetchBuyers, initialValue: [] });

    const timeSlots = getTimeSlots(OPENING_HOUR, OPENING_MINUTE, CLOSING_HOUR, CLOSING_MINUTE);

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="title">Event name :</label>
                <input className="border-1" type="text" name="title" id="title" data-testid="input-title"/>
            </div>
            <div>
                <label htmlFor="vendorId">Vendor :</label>
            <select name="vendorId" id="vendorId">
                {vendors.entities.map(v => (
                    <option key={`vendor-${v.id}`} value={v.id}>{v.name}</option>
                ))}
            </select>
            </div>
            <div>
                <label htmlFor="buyerId">Buyer :</label>
            <select name="buyerId" id="buyerId">
                {buyers.entities.map(b => (
                    <option key={`buyer-${b.id}`} value={b.id}>{b.name}</option>
                ))}
            </select>
            </div>
            <div>
                <label htmlFor="#">Event duration</label>
            <select name="startTime" >
                {timeSlots.map((t, index) => (
                    <option key={`timeslot-start-${index}`} value={format(t.start, 'HH:mm')}>{format(t.start, 'HH:mm')}</option>
                ))}
            </select> - 
            <select name="endTime">
                {timeSlots.map((t, index) => (
                    <option key={`timeslot-end-${index}`} value={format(t.end, 'HH:mm')}>{format(t.end, 'HH:mm')}</option>
                ))}
            </select>
            </div>
            <button className="block w-80 bg-teal-500 text-white text-lg rounded px-8 mx-auto mt-8" data-testid="submit">Book</button>
        </form>
    );
}