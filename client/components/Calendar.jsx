import React, { useState, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import AddEventModal from "./AddEventModal.jsx";

const CalendarContainer = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const calendarRef = useRef(null);
  const onEventAdded = (event) => {
    let calendarApi = calendarRef.current.getApi();
    console.log(event);
    calendarApi.addEvent(event);
  };

  const handleClick = () => {
    setModalOpen(true);
  };

  const onClose = () => {
    setModalOpen(false);
  };

  return (
    <section>
      <button onClick={handleClick}>Add Event</button>
      <div className="calendar-container">
        <FullCalendar
          ref={calendarRef}
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridWeek"
        />
      </div>

      <AddEventModal
        isOpen={modalOpen}
        onClose={onClose}
        onEventAdded={(event) => onEventAdded(event)}
      />
    </section>
  );
};

export default CalendarContainer;
