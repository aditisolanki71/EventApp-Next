import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function EventPage() {
   const allEvents = getAllEvents();
   const router = useRouter();
   const handleSearch = (year,month) => {
      console.log("year",year,"month",month)
      const fullPath = `/events/${year}/${month}`
      router.push(fullPath);
   }
   return (
      <div>
         <EventsSearch onSearch={handleSearch}/>
         <EventList events={allEvents}/>
      </div>
   )
}
export default EventPage;