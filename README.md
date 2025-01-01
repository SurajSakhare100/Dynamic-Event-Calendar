# Dynamic Event Calendar Application

This is a **Dynamic Event Calendar Application** built with **React.js**. The goal of this project is to provide a clean and intuitive UI for managing events in a calendar view. The application allows users to add, edit, delete, and view events for any given day, while ensuring the calendar is responsive and user-friendly.

## Demo
  ![demo1](https://raw.githubusercontent.com/SurajSakhare100/Dynamic-Event-Calendar/refs/heads/main/assests/demoImage%20(1).png)
  ![demo2](https://raw.githubusercontent.com/SurajSakhare100/Dynamic-Event-Calendar/refs/heads/main/assests/demoImage%20(2).png)
  ![demo3](https://raw.githubusercontent.com/SurajSakhare100/Dynamic-Event-Calendar/refs/heads/main/assests/demoImage%20(3).png)
  ![demo4](https://raw.githubusercontent.com/SurajSakhare100/Dynamic-Event-Calendar/refs/heads/main/assests/demoImage%20(4).png)


## Features

### Core Features:
- **Calendar View**: 
  - Display a grid view of the current month.
  - Switch between months using "Previous" and "Next" buttons.
- **Event Management**:
  - Add events by clicking on any day in the calendar.
  - Edit or delete events from a selected day.
  - Each event includes the following details:
    - Event name
    - Start time and end time
    - Optional description
- **Event List**:
  - Display a list of all events for the selected day in a modal or side panel.
- **Data Persistence**:
  - Events are stored in **localStorage** or an in-memory data store to persist events across page refreshes.
  
### UI Features:
- Clean and modern UI designed using **shadcn** components.
- Display days in a grid with visual separation for weekends and weekdays.
- Highlight the current day and the selected day for easy navigation.

### Advanced Features:
- **Month Transitions**: Automatically handle month transitions (e.g., from January 31 to February 1).
- **Prevent Overlapping Events**: Ensure no overlapping events are added for the same time slot.
- **Event Filtering**: Filter events by keyword.
- **Color Coding**: Categorize events by type (e.g., work, personal).
- **Exporting Events**: Allow exporting the event list for a specific month in **JSON** or **CSV** format.
- **Event Categorization**: Different colors for different event categories (e.g., personal, work).
---


## Project Setup

### Prerequisites:
- Node.js (version 14 or higher)
- npm (version 6 or higher)


### Installation:

1. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/yourusername/dynamic-event-calendar.git
   cd dynamic-event-calendar
   ```
   
   ```bash
   npm install
   npm run dev
   ```

- This will start the application locally at `http://localhost:5173`.

## Deployment
This project has been deployed to Vercel . You can access the live demo at the following URL:
- https://myeventgrid.vercel.app

## License
This project is licensed under the MIT License.

