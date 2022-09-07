import {Fragment} from "react";
//import { useRouter } from "next/router";
// import { getEventById } from "../../dummy-data";
import { getEventById, getFeaturedEvents} from "../../helpers/api-util"
import EventSummary from "../../components/event-detail/event-summary"
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
function EventDetailPage(props) {
   console.log("event detail page called",props)
   // const router = useRouter();
   // const eventId = router.query.eventId;
   // const event = getEventById(eventId)
   const event = props?.selectedEvent;
   console.log("event is",event);
   if(!event) {
      return (
         <div className="center">
            <p>Loading...</p>
         </div>
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
         selectedEvent: event ? event : undefined
      }
   }
}
//doesn't know which eventid should be pre-generate
export async function getStaticPaths() {
   console.log("get static paths")
   const events = await getFeaturedEvents();
   const paths = events.map(e => ({ params: { eventId: e.id }}))
   console.log("paths",paths);
   return {
      // paths: [
      //    { params: { eventId: "e1" }}
      // ]
      paths: paths,
      //more pages than prepared here
      //fallback: true

      //stick to the previous page till data don't come
      fallback:"blocking"
   }
}
export default EventDetailPage;