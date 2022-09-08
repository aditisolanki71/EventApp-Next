import Image from "next/image"
import Button from "../ui/button"
import classes from "./event-item.module.css"
import DateIcon from "../icons/date-icon";
import AddressIcon from "../icons/address-icon"
import ArrowRight from "../icons/arrow-right-icon"
function EventItem(props) {
   const { title, image, date, location, id } = props.event;
   const humanReadableDate = new Date(date).toLocaleDateString('en-Us', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
   });
   const formattedAddress = location.replace(', ','\n')
  
   const exploreLink= `events/${id}`
   return (
     <li className={classes.item}>
        {/* <img src={`/${image}`} alt={title} /> */}
           {/* js create multiple version f image,optimize image size then image will be cache for future ref of same device */}
           <Image src={'/'+ image} alt={title} width={250} height={220}/>
     
        {/* <img src={'/'+ image} alt={title} /> */}
        <div className={classes.content}>
           <div className={classes.summary}>
           <h2>Title:- {title}</h2>
               <div className={classes.date}>
                  <DateIcon />
                  <time>Date:-{humanReadableDate}</time>
               </div>
               <div className={classes.address}>
                  <AddressIcon />
                  <address>Address:{formattedAddress}-</address>
               </div>
            </div>
            <div className={classes.action}>
               {/* <Link href={exploreLink}>Explore Event</Link> */}
               <Button link={exploreLink}>
                  <span>Explore Event</span>
                  <span className={classes.icon}><ArrowRight/></span>
               </Button>
            </div>
        </div> 
     </li>
   )
}
export default EventItem;