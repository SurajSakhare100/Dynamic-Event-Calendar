import React, { useState } from 'react';

const Calendar = ({ events, selectedDate, setSelectedDate, setShowEventForm, setSelectedEvent }) => {
  const [hoveredDay, setHoveredDay] = useState(null);
  const currentMonth = selectedDate.getMonth();
  const currentYear = selectedDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
 
  const handleDayClick = (day) => {
    setSelectedDate(new Date(currentYear, currentMonth, day));
    const dayEvents = events.filter(
      (event) =>
        new Date(event.date).toDateString() ===
        new Date(currentYear, currentMonth, day).toDateString()
    );
    if (dayEvents.length === 0) {
      setSelectedEvent(null); 
      setShowEventForm(true);
    } else {
      setSelectedEvent(dayEvents[0]); 
      setShowEventForm(true);
    }
  };

  const getDayEvents = (day) => {
    return events.filter(
      (event) =>
        new Date(event.date).toDateString() ===
        new Date(currentYear, currentMonth, day).toDateString()
    );
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const goToPrevMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const goToNextMonth = () => {
    setSelectedDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const eventTypeColors = {
    Personal: "#F56565",  
    Work: "#4CAF50",      
    Meeting: "#2196F3",   
    Other: "#FF9800",     
  };


  const generateCalendarDays = () => {
    const days = [];
    const emptyDays = firstDay === 0 ? 0 : firstDay;
  
    for (let i = 0; i < emptyDays; i++) {
      days.push(<div key={`empty-${i}`} className="day empty"></div>);
    }
  
    // Generate the days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const dayEvents = getDayEvents(i);
      const hasEvent = dayEvents.length > 0; // Check if there are events for the day
      const todayClass = isToday(i) ? 'bg-green-500' : '';
      const dayOfWeek = new Date(currentYear, currentMonth, i).getDay();
      const sundayClass = dayOfWeek === 0 ? 'bg-red-500' : '';
  
      days.push(
        <div
          key={i}
          className={`day flex flex-col items-start p-2 m-1 rounded-lg cursor-pointer hover:bg-slate-700 relative 
          ${hasEvent ? 'bg-yellow-400 text-white' : 'bg-gray-800 text-white'} ${todayClass} ${sundayClass}`}
          style={{ height: '90px', width: '90px' }}
          onClick={() => handleDayClick(i)}
          onMouseEnter={() => setHoveredDay(i)}
          onMouseLeave={() => setHoveredDay(null)}
        >
          <div className="date font-bold">{i}</div>
          <div className="events-list mt-2 w-full text-xs text-left absolute bottom-0.5 left-1/2">
            {dayEvents.length > 0 &&
              dayEvents.map((event, index) => (
                <div
                  key={index}
                  className="event-label cursor-pointer p-0.5 px-1 mt-1 rounded-full text-sm transform -translate-x-1/2"
                  style={{
                    backgroundColor: eventTypeColors[event.type] || "#FFFFFF",
                    color: 'white',
                    textAlign: 'center',
                    width: '80%',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedEvent(event);
                    setSelectedDate(new Date(currentYear, currentMonth, i));
                    setShowEventForm(true); 
                  }}
                >
                  {event.name}
                </div>
              ))}
          </div>
  
          {hoveredDay === i && hasEvent && (
            <div
              className="absolute top-0 right-2 text-3xl text-white cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedEvent(null); 
                setShowEventForm(true); 
                setSelectedDate(new Date(currentYear, currentMonth, i));
              }}
            >
              +
            </div>
          )}
        </div>
      );
    }
  
    return days;
  };
  

  return (
    <div className="calendar flex flex-col items-center w-full bg-black text-white rounded-lg shadow-lg relative">
      <div className="calendar-header flex justify-around w-full mb-5 px-20">
        <button onClick={goToPrevMonth} className="px-4 py-2 bg-gray-700 rounded-lg">
          Prev
        </button>
        <span className="text-xl">
          {`${selectedDate.toLocaleString('default', { month: 'long' })} ${currentYear}`}
        </span>
        <button onClick={goToNextMonth} className="px-4 py-2 bg-gray-700 rounded-lg">
          Next
        </button>
      </div>
      <div className="calendar-grid grid grid-cols-7 gap-2 ">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="day-name text-md font-semibold">
            {day}
          </div>
        ))}
        {generateCalendarDays()}
      </div>
    </div>
  );
};

export default Calendar;
