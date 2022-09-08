import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import { getFilteredEvents } from "../../dummy-data";
import { getFilteredEvents } from "../../helpers/api-util"
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert"
function FilteredEventsPage(props) {
   const router = useRouter();
   const filterData = router.query.slug;
   console.log("filter",filterData);

   const filterYear = filterData[0];
   const filterMonth = filterData[1];
   const numYear = +filterYear;
   const numMonth = +filterMonth;
   const pageHeadData = (
      <Head>
      <title>Filtered Events</title>
      <meta 
         name="description" 
         content={`All Events for ${numMonth}/${numYear}`}
         />
   </Head>
   )
   if(!filterData) {
      return (
         <Fragment>
            {pageHeadData}
            <p className="center">Loading...</p>
         </Fragment>
      )
   }
   if(props.hasError) {
      return (
         <Fragment>
            {pageHeadData}
            <ErrorAlert>
               <p>Invalid Filterr....</p>
            </ErrorAlert>
            <div className="center">
               <Button link="/events">Show All Events</Button>
            </div>
         </Fragment>
      )
   }
   // const filteredEvents = await getFilteredEvents({
   //    year: numYear,
   //    month: numMonth
   // });
   const filteredEvents = props.events;
   if(!filteredEvents || filteredEvents.length === 0) {
      return (
         <Fragment>
            {pageHeadData}
            <ErrorAlert>
               <p>No Evets Found....</p>
            </ErrorAlert>
            <div className="center">
               <Button link="/events">Show All Events</Button>
            </div>
         </Fragment>
      )
   }
   const date = new Date(props.date.year, props.date.month - 1)
   return (
      <Fragment> 
         {pageHeadData}
         <ResultsTitle date={date}/>
         <EventList events={filteredEvents}/>
      </Fragment>
   )
}

export async function getServerSideProps(context) {
   const { params } = context;

   const filterData = params.slug;

   const filterYear = filterData[0];
   const filterMonth = filterData[1];
   const numYear = +filterYear;
   const numMonth = +filterMonth;
   if(isNaN(numYear) ||
      isNaN(numMonth) || 
      numYear > 2030 || 
      numYear < 2021 || 
      numMonth < 1 || 
      numMonth > 12
   ) {
      return {
         props: {
            hasError: true
         },
         // notFound: true,
         // redirect: {
         //    destination: '/error'
         // }
      };
   }
   const filteredEvents = await getFilteredEvents({
      year: numYear,
      month: numMonth
   });
   return {
      props: {
         events: filteredEvents,
         date: {
            year: numYear,
            month: numMonth
         }
      }
   }
}
export default FilteredEventsPage;