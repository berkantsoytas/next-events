import EventItem from "./event-item";
import styles from './event-list.module.css'
export default function EventList({items}) {
  return <ul className={styles.list}>
    {items.map((value, key) =>(
        <EventItem
        key={key}
        id={value.id}
        title={value.title} location={value.location}
        date={value.date}
        image={value.image}/>
      ))}
  </ul>
}