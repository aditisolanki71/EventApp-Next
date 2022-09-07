import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
function EventPage() {
   const allEvents = getAllEvents();
   return (
      <div>
         <EventList events={allEvents}/>
      </div>
   )
}
export default EventPage;