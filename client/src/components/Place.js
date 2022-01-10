import { Link } from "react-router-dom";

export function PlaceList({ place }) {
  return (    
    <Link
      key={place.id}
      className="card"
      to={`/places/${place.id}`}
    >
      <div className="card_head">
        <div className="num">
          <span>No.</span>
          <span>{place.id}</span>
        </div>
        <div className="title">
            <h2><span>{place.name}</span></h2>
        </div>
      </div>
    </Link>
  );
}


export function PlaceEventList({ event }) {
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
        <div className="title">
            <h2><span>{event.name}</span></h2>
        </div>
      </div>
    </Link>
  );
}

export function PlaceDetail({ place }) {
  return (    
    <div className="card">
      <div className="card_head">
        <div className="num">
          <span>No.</span>
          <span>{place.id}</span>
        </div>
        <div className="title">
            <h2><span>{place.name}</span></h2>
        </div>
      </div>
      <div className="card_detail">
        <div className="memo">
          <span>{place.memo}</span>
        </div>
        <div className="place_event">
          
          {place.Events.map((eve) => {
            return <PlaceEventList key={eve.id} event={eve} />;
          })}
        </div>
      </div>
    </div>
  );
}