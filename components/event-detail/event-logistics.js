import Image from "next/image"
import AddressIcon from '../icons/address-icon';
import DateIcon from '../icons/date-icon';
import LogisticsItem from './logistics-item';
import classes from './event-logistics.module.css';

function EventLogistics(props) {
  const { date, location, image, imageAlt } = props.event;
  console.log("event loistic",props);
  const humanReadableDate = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  console.log("human",humanReadableDate);
  const addressText = location?.replace(', ', '\n');

  console.log("image is",image);
  return (
    <section className={classes.logistics}>
      <div className={classes.image}>
        {/* <img src={`/${image}`} alt={imageAlt} /> */}
        <Image src={`/${image}`} alt={imageAlt} height={300} width={300}/>

      </div>
      <ul className={classes.list}>
        <LogisticsItem icon={DateIcon}>
          <time>{humanReadableDate}</time>
        </LogisticsItem>
        <LogisticsItem icon={AddressIcon}>
          <address>{addressText}</address>
        </LogisticsItem>
      </ul>
    </section>
  );
}

export default EventLogistics;
