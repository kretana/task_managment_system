import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useSelector } from 'react-redux';
import {parseISO} from "date-fns";

const localizer = momentLocalizer(moment);

export const CalendarView = () => {
    const [events, setEvents] = useState([]);
    const tasks = useSelector((state: any) => state.tasks.tasks);

    useEffect(() => {
        const formattedTasks = tasks.map(task => {
            const startDate = task.createdAt ? parseISO(task.createdAt) : new Date();
            const endDate = task.completedAt ? parseISO(task.completedAt) : new Date();
            // Check for invalid dates
            if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
                console.error(`Invalid dates for task: ${task.title}`, {
                    createdAt: task.createdAt,
                    completedAt: task.completedAt,
                });
                return null;
            }
            return {
                title: task.title,
                start: startDate,
                end: endDate,
                allDay: true,
            };
        }).filter(event => event !== null);

        setEvents(formattedTasks);
    }, [tasks]);

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Task Calendar</h2>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '50px' }}
                views={['month', 'week', 'day']}
                defaultView="month"
                selectable
                onSelectEvent={(event) => alert(event.title)}
                onSelectSlot={(slotInfo) => alert(`Selected slot: ${slotInfo.start} - ${slotInfo.end}`)}
            />
        </div>
    );
};
