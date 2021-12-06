import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import moment from "moment";


function ActivitySchedule() {
    const [trainings, setTrainings] = useState([]);
    const [sessions, setSessions] = useState([]);
    
    // default tz set to GMT with
    moment.tz.setDefault("Europe/London");

    // fetch training data with customers
    useEffect(() => {
        fetchTrainings();
    }, []);

    // map needed training objects to trainings array with an empty end-property    
    function fetchTrainings() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => data.map(training => 
            setTrainings(trainings => [...trainings, {title: 
            `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`, 
            start: training.date,
            end: '',
            duration: training.duration, 
            allDay: false}])
            ))
        .catch(err => console.error(err))
    };

    // observe training object array, derive an end-iso string for each one from known properties
    useEffect(() => {
        trainings.forEach(training =>
            { if (training.end === '') {
            const end = moment(training.start);
            end.add(training.duration, 'minutes');
            const endIso = moment(end).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
            training.end = endIso;
            ;}
        });
    }, [trainings])

    /* trigger a final re-render by copying training object array to the state array
    used by the calendar, ensuring that each end value is saved before the calendar is rendered.
    Without this, the final object in the training array will get its end-value, but
    the calendar will render without it. 
    */
    useEffect(() => {
        setSessions(trainings);
    }, [trainings]);

    /* On clicking an event, the user gets an alert with the event info.
    Could be replaced with a tooltip or similar if developed further */
    const eventInfo = (info) => {
        const start = moment(info.event.start).format('HH:mm');
        const end = moment(info.event.end).format('HH:mm');
        const title = String(info.event.title);
        alert(`${start} - ${end} ${title}`);
    }

    return (
        <div style={{ marginTop: 10, marginLeft: 10, width: '95%'}}>
            <FullCalendar 
            plugins={[timeGridPlugin, dayGridPlugin, momentTimezonePlugin]}
            initialView='timeGridWeek'
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,dayGridDay',
              }}
            events={sessions}
            eventClick={eventInfo}
            timeZone='Europe/London'
            height={600}
            allDaySlot={false}
            titleFormat={{month: 'short', day: 'numeric', weekday: 'short', omitCommas: true}}
            dayHeaderFormat={{month: 'short', day: 'numeric', weekday: 'short'}}
            />
        </div>
    )
}

export default ActivitySchedule;