import { Link } from "react-router-dom";

export function EventList({ event }) {
  return (    
    <Link
      key={event.id}
      className="card"
      to={`/events/${event.id}`}
    >
      <div className="card_head">
        <div className="num">
          <span>No.</span>
          <span>{event.id}</span>
        </div>
        <div className="date">
          <span>{event.date}</span>
        </div>{/* date */}
        <div className="title">
            <h2><span>{event.name}</span></h2>
        </div>
        <div className="place">
          <p><span>{event.Place.name}</span></p>
        </div>{/* place */}
      </div>
    </Link>
  );
}

