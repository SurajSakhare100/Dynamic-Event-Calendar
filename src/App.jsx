import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";
import EventForm from "./components/EventForm";
import EventList from "./components/EventList";
import { Toaster } from "./components/ui/toaster.jsx";

const App = () => {
  const [events, setEvents] = useState(JSON.parse(localStorage.getItem('events')) || []);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showEventForm, setShowEventForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents([...events, event]);
  };

  const editEvent = (eventId, updatedEvent) => {
    setShowEventForm(true);
    setSelectedEvent(updatedEvent);
  };

  const deleteEvent = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const updateEvent = (eventId, updatedEvent) => {
    setEvents(events.map((event) => (event.id === eventId ? updatedEvent : event)));
  };

  const filteredEvents = events.filter(
    (event) =>
      event.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-[#000000] text-white overflow-hidden">
      <div className="w-1/4 bg-black p-4 border-r">
        <h2 className="text-2xl font-bold mb-6">Event List</h2>
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search events"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            className="w-full p-3 bg-gray-700 text-white rounded-lg placeholder-gray-400 focus:outline-none"
          />
        </div>
        <EventList
          events={filteredEvents}
          editEvent={editEvent}
          deleteEvent={deleteEvent}
        />
      </div>

      <div className="flex-1  bg-black">
        <h2 className="text-3xl text-center font-semibold mb-6 border-b p-6">Dynamic Event Calendar</h2>
        <Calendar
          events={events}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          setShowEventForm={setShowEventForm}
          setSelectedEvent={setSelectedEvent}
        />
      </div>

      {showEventForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <EventForm
              selectedDate={selectedDate}
              addEvent={addEvent}
              setShowEventForm={setShowEventForm}
              selectedEvent={selectedEvent}
              updateEvent={updateEvent}
              events={events}
              deleteEvent={deleteEvent}
            />
          </div>
        </div>
      )}

      <Toaster />
    </div>
  );
};

export default App;
