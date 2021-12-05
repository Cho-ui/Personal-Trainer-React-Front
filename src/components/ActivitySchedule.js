import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import momentTimezonePlugin from "@fullcalendar/moment-timezone";
import momentPlugin from "@fullcalendar/moment";
import moment from "moment";

function ActivitySchedule() {
    const [sessions, setSessions] = useState([]);

    // default tz set to GMT with
    moment.tz.setDefault("Europe/London");

    // fetch training data with customers
    useEffect(() => {
        fetchSessions();
    }, []);
    
    function fetchSessions() {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => data.map(training => 
            setSessions(sessions => [...sessions, {title: 
            `${training.activity} / ${training.customer.firstname} ${training.customer.lastname}`, 
            start: training.date,
            end: '',
            duration: training.duration, 
            allDay: false}])
            ))
        .catch(err => console.error(err))
    };

    useEffect(() => {
        sessions.forEach(session =>
            {const end = moment(session.start);
            end.add(session.duration, 'minutes');
            const endIso = moment(end).format('YYYY-MM-DD[T]HH:mm:ss.SSSZ');
            session.end = endIso;
        });
    }, [sessions])

    return (
        <div style={{ marginTop: 10, marginLeft: 10, width: '95%'}}>
            <FullCalendar 
            plugins={[timeGridPlugin, momentPlugin, momentTimezonePlugin]}
            initialView='timeGridWeek'
            events={sessions}
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