import React from "react";
import Button from "./ui/button";

const highlightKeyword = (text, keyword) => {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword})`, "gi");
  return text.replace(regex, (match) => `<mark class="bg-yellow-300">${match}</mark>`);
};
const formatTime = (time) => {
  // Parse the given time as a Date object (assuming it's in UTC)
  const date = new Date(`1970-01-01T${time}:00Z`);

  // Format the time according to IST (Asia/Kolkata timezone)
  const options = { 
    hour: '2-digit', 
    minute: '2-digit', 
    hour12: true, 
    timeZone: 'Asia/Kolkata'
  };

  return new Intl.DateTimeFormat('en-IN', options).format(date);
};


const convertToCSV = (events) => {
  const header = ["Event Name", "Start Time", "End Time", "Description", "Date"];
  const rows = events.map((event) => [
    event.name,
    formatTime(event.startTime),
    formatTime(event.endTime),
    event.description || '',
    event.date,
  ]);
  const csvContent = [
    header.join(","),
    ...rows.map(row => row.join(","))
  ].join("\n");
  return csvContent;
};

const downloadCSV = (events) => {
  const csvContent = convertToCSV(events);
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", "events.csv");
  link.click();
};

const EventList = ({ events, editEvent, deleteEvent, searchKeyword }) => {
  return (
    <div className="event-list">
      <h2 className="text-2xl font-bold mb-6 text-center text-wrap text-white">
        {events.length > 0 ? "All Events" : "No Events Available"}
      </h2>
      <div className="mb-4 text-center items-end self-end">
        {events.length > 0 && (
          <Button
            onClick={() => downloadCSV(events)}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Download Events
          </Button>
        )}
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-400">No events found.</p>
      ) : (
        <div
          className="grid grid-cols-1 gap-4 overflow-y-auto"
          style={{ maxHeight: "480px" }} 
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="p-5 bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-700"
            >
              <div className="flex justify-between items-center mb-4">
                <h3
                  className="text-lg font-bold text-blue-400"
                  dangerouslySetInnerHTML={{
                    __html: highlightKeyword(event.name, searchKeyword),
                  }}
                ></h3>
                <span className="text-sm text-gray-400">{event.date}</span>
              </div>
              <div className="mb-2">
                <p className="text-sm font-medium text-green-400">
                  {`${formatTime(event.startTime)} - ${formatTime(event.endTime)}`}
                </p>
                {event.description && (
                  <p
                    className="text-sm text-gray-300 mt-2"
                    dangerouslySetInnerHTML={{
                      __html: highlightKeyword(event.description, searchKeyword),
                    }}
                  ></p>
                )}
              </div>
              <div className="mt-4 flex gap-2">
                <Button
                  onClick={() => editEvent(event.id, event)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteEvent(event.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default EventList;
