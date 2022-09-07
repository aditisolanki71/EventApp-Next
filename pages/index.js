import { getFeaturedEvents } from '../dummy-data'
import EventList from "../components/events/event-list"
export default function HomePage() {
  const featuredEvent = getFeaturedEvents();
  return (
    <div>
      <EventList events={featuredEvent}/>
    </div>
  )
}