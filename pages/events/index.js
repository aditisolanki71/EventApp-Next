// import { getAllEvents } from "../../dummy-data";
import { Fragment } from "react";
import Head from "next/head";
import { getAllEvents } from "../../helpers/api-util";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

function EventPage(props) {
   // const allEvents = getAllEvents();
   const { events } = props;
   const router = useRouter();
   const handleSearch = (year,month) => {
      console.log("year",year,"month",month)
      const fullPath = `/events/${year}/${month}`
      router.push(fullPath);
   }
   return (
      <Fragment>
         <Head>
            <title>All Events</title>
            <meta 
               name="description" 
               content="Find a lot of great events that allow you to evolve..."
               />
         </Head>
         <EventsSearch onSearch={handleSearch}/>
         <EventList events={events}/>
      </Fragment>
   )
}

export async function getStaticProps() {
   const allEvents = await getAllEvents();
   return {
      props: {
         events: allEvents
      },
      revalidate: 60
   }
}

export default EventPage;