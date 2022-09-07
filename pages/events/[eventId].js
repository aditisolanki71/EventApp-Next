import {Fragment} from "react";
import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
function EventDetailPage() {
   const router = useRouter();
   console.log("event detail",router.query);
   const eventId = router.query.eventId;
   const event = getEventById(eventId)
   console.log("res",event);
   if(!event) {
      return (
         <ErrorAlert>
            <p>No event Found</p>
         </ErrorAlert>
         )
   }
   return (
      <Fragment>
         <EventSummary title={event.title}/>
         <EventLogistics event={event} imageAlt={event.title}/>
         <EventContent>
            <p>{event.description}</p>
         </EventContent>
      </Fragment>
   )
}
export default EventDetailPage;