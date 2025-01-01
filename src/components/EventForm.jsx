import React, { useEffect, useState } from 'react';
import { BiX } from 'react-icons/bi';
import Button from './ui/button';
import { useToast } from './ui/use-toast';




const EventForm = ({
  selectedDate,
  events,
  addEvent,
  setShowEventForm,
  selectedEvent,
  updateEvent,
  deleteEvent,
}) => {
  const [event, setEvent] = useState({
    name: '',
    startTime: '12:00',
    endTime: '12:30',
    description: '',
    type: 'Personal',
    id: null,
  });

  const { toast } = useToast();

  const convertToIST = (time) => {
    const [hours, minutes] = time.split(':');
    const date = new Date();
    date.setHours(hours, minutes, 0);
    return date.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const overlap = events.some((existingEvent) => {
      if (existingEvent.date === selectedDate.toDateString() && existingEvent.id !== event.id) {
        return (
          (event.startTime >= existingEvent.startTime && event.startTime < existingEvent.endTime) ||
          (event.endTime > existingEvent.startTime && event.endTime <= existingEvent.endTime) ||
          (event.startTime <= existingEvent.startTime && event.endTime >= existingEvent.endTime)
        );
      }
      return false;
    });

    if (overlap) {
      toast({
        title: 'Time Overlap',
        variant: 'destructive',
      });
      return;
    }

    if (event.name && event.startTime && event.endTime) {
      if (event.id) {
        updateEvent(event.id, { ...event, date: selectedDate.toDateString() });
      } else {
        addEvent({ ...event, id: Date.now(), date: selectedDate.toDateString() });
      }
      setShowEventForm(false);
    }
  };

  const handleDelete = () => {
    if (event.id) {
      deleteEvent(event.id);
      setShowEventForm(false);
    }
  };

  const closeModal = () => {
    setShowEventForm(false);
  };
  const handleTimeChange = (e, timeType) => {
    const timeInIST = convertToIST(e.target.value);
    setEvent({ ...event, [timeType]: timeInIST });
  };

  useEffect(() => {
    if (selectedEvent) {
      setEvent({
        name: selectedEvent.name,
        startTime: selectedEvent.startTime,
        endTime: selectedEvent.endTime,
        description: selectedEvent.description || '',
        type: selectedEvent.type || 'Personal',
        id: selectedEvent.id,
      });
    }
  }, [selectedEvent]);

  return (
    <div className="relative event-form bg-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-2">
        {event.id ? 'Edit Event' : 'Add Event'}
      </h2>
      <p className="text-2xl text-gray-400 mb-4">
        <span className="font-medium text-white">{selectedDate.toDateString()}</span>
      </p>
      <BiX
        className="text-3xl text-white absolute top-2 right-2 cursor-pointer"
        onClick={closeModal}
      />
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Event Name"
          value={event.name}
          onChange={(e) => setEvent({ ...event, name: e.target.value })}
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <select
          value={event.type}
          onChange={(e) => setEvent({ ...event, type: e.target.value })}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Meeting">Meeting</option>
          <option value="Other">Other</option>
        </select>

        <div className="mb-4 grid grid-cols-2 gap-4">
          <input
            type="time"
            id="startTime"
            value={event.startTime}
            onChange={(e) => handleTimeChange(e, 'startTime')}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="time"
            id="endTime"
            value={event.endTime}
            onChange={(e) => handleTimeChange(e, 'endTime')}
            required
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>


        <textarea
          placeholder="Description (Optional)"
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        />
        <div className="flex justify-between">
          {event.id && (
            <Button
              type="button"
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200"
            >
              Delete Event
            </Button>
          )}
          <Button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Save Event
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
