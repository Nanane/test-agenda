import format from "date-fns/format";
import React, { useState } from "react";
import { fetchBuyers } from "../../../api/buyer";
import { createEvent } from "../../../api/event";
import { ApiBuyer, ApiEvent, ApiVendor } from "../../../api/types";
import { fetchVendors } from "../../../api/vendor";
import { CLOSING_HOUR, CLOSING_MINUTE, OPENING_HOUR, OPENING_MINUTE } from "../../../constants";
import { formDataToJSON } from "../../../specific-IGNORE-/form";
import { getDateFromTime, getTimeSlots } from "../../../technical/helpers/date";
import { useApi } from "../../../technical/hooks/api";
import { ErrorsFor, EventFormData, validate } from "./utils";

interface FormErrorProps {
    errors?: string[];
}

function FormError({ errors }: FormErrorProps) {
    if (!errors || errors.length === 0) {
        return <></>;
    }
    return (<>{errors.map(error => (<div className="text-red-500 font-bold block">{error}</div>))}</>);
}

interface EventFormProps {
    onSubmit: (event: ApiEvent) => void;
    forDate: Date;
}

export default function EventForm({ onSubmit, forDate }: EventFormProps) {
    const [errors, setErrors] = useState<ErrorsFor<EventFormData>>({});

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        // parse form data to get a well formed json
        const formData = new FormData(e.currentTarget);
        const json = formDataToJSON<EventFormData>(formData);
        json.buyerId = parseInt(json.buyerId);
        json.vendorId = parseInt(json.vendorId);

        // validation
        const errors = validate(json);
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        // parse startTime input
        const startDatetime = getDateFromTime(json.startTime, forDate);
        // parse endTime input
        const endDatetime = getDateFromTime(json.endTime, forDate);

        return createEvent({
            ...json,
            startDatetime,
            endDatetime,
        }).then(onSubmit)
    }

    const vendors = useApi<ApiVendor[]>({ promise: fetchVendors(), initialValue: []});
    const buyers = useApi<ApiBuyer[]>({ promise: fetchBuyers(), initialValue: [] });

    const timeSlots = getTimeSlots();

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <label className="inline-block w-1/3" htmlFor="title">Event name :</label>
                <input className="box-border inline-block w-2/3 border" type="text" name="title" id="title" data-testid="input-title"/>
                <FormError errors={errors.title} />
            </div>
            <div className="my-2">
                <label className="inline-block w-1/3" htmlFor="vendorId">Vendor :</label>
                <select className="box-border inline-block w-2/3 border" name="vendorId" id="vendorId">
                    {vendors.entities.map(v => (
                        <option key={`vendor-${v.id}`} value={v.id}>{v.name}</option>
                    ))}
                </select>
                <FormError errors={errors.vendorId} />
            </div>
            <div className="my-2">
                <label className="inline-block w-1/3" htmlFor="buyerId">Buyer :</label>
                <select className="box-border inline-block w-2/3 border" name="buyerId" id="buyerId">
                    {buyers.entities.map(b => (
                        <option key={`buyer-${b.id}`} value={b.id}>{b.name}</option>
                    ))}
                </select>
                <FormError errors={errors.buyerId} />
            </div>
            <div className="my-2">
                <label className="inline-block w-1/3" htmlFor="#">Event duration</label>
                <div className="box-border inline-block w-2/3 border" >
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
                <FormError errors={errors.startTime} />
                <FormError errors={errors.endTime} />
            </div>
            <button className="block w-80 bg-teal-500 text-white text-lg rounded px-8 mx-auto mt-8" data-testid="submit">Book</button>
        </form>
    );
}
