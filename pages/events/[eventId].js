import {Fragment} from "react";
//import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import { getEventById, getAllEvents} from "../../helpers/api-util"
import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
function EventDetailPage(props) {
   console.log("event detail page called",props)
   // const router = useRouter();
   // const eventId = router.query.eventId;
   // const event = getEventById(eventId)
   const event = props.selectedEvent;
   console.log("event is",event);
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

export async function getStaticProps(context) {
   console.log("get static props",context);
   const eventId = context.params.eventId;
   const event = await getEventById(eventId);
   console.log("event isss",event);
   return {
      props: {
         selectedEvent: event
      }
   }
}
//doesn't know which eventid should be pre-generate
export async function getStaticPaths() {
   console.log("get static paths")
   const events = await getAllEvents();
   const paths = events.map(e => ({ params: { eventId: e.id }}))
   console.log("paths",paths);
   return {
      // paths: [
      //    { params: { eventId: "e1" }}
      // ]
      paths: paths,
      fallback: false
   }
}
export default EventDetailPage;