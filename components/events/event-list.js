import EventItem from './event-item';
import classes from "./event-list.module.css";
function EventList(props) {
   console.log("event list",props);
   const { events } = props;
   return (
      <div>
         <ul className={classes.list}>
            {events?.map((event) => (
            <EventItem 
               key={event.id}
               id={event.id} 
               event={event}/>
            ))}
         </ul>
      </div>
   )
}
export default EventList;