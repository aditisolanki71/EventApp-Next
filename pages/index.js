//import { getFeaturedEvents } from '../dummy-data'
import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util"
import EventList from "../components/events/event-list"
import NewsletterRegistration from "../components/input/newsletter-registration"
function HomePage(props) {
  //const featuredEvent = getFeaturedEvents();
  return (
    <div>
      {/* add html section,nextjs inject them into a head section */}
      <Head>
        <title>NextJS Events</title>
        {/* Meta is show up in serach result when your page */}
        <meta 
          name="description" 
          content="Find a lot of great events that allow you to evolve..."
          />
      </Head>
      <NewsletterRegistration />
      {/* <EventList events={featuredEvent}/> */}
      <EventList events={props.events}/>
    </div>
  )
}
export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents
    },
    revalidate: 30
  }
}
export default HomePage;