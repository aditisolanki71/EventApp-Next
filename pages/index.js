//import { getFeaturedEvents } from '../dummy-data'
import { getFeaturedEvents } from "../helpers/api-util"
import EventList from "../components/events/event-list"
function HomePage(props) {
  //const featuredEvent = getFeaturedEvents();
  return (
    <div>
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