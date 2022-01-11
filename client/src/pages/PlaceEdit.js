import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { getPlace } from "../api.js";
import { Breadcrumb, Loading, Pagination } from "../components";
import { handleDeletePlace, handleEditPlace } from "../api.js";


function PlaceEventList({ event }) {
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
        </div>
        <div className="title">
            <h2><span>{event.name}</span></h2>
        </div>
      </div>
    </Link>
  );
}


function PlaceEdit({ place }) {
  return (
    <div className="card">
      <form onSubmit={handleEditPlace} className="card_head">      
        <input type="hidden" name="id" value={place.id}/>
        <div className="name">
          <label htmlFor="name">名前</label>
          <input type="text" name="name" defaultValue={place.name}/>
        </div>
        <div className="memo">
          <label htmlFor="memo">メモ</label>
          <input type="text" name="memo" defaultValue={place.memo}/>
        </div>
        <button type="submit">更新</button>
      </form>
      
      <div className="card_detail">
        <div className="place_event">
          {place.Events.map((eve) => {
            return <PlaceEventList key={eve.id} event={eve} />;
          })}
        </div>
      </div>
    </div>
  );
}


export function PlaceEditPage() {
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getPlace(params.placeId).then((data) => {
      setPlace(data);
      console.log(data);
    });
  }, [params.placeId]);

  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", content: "トップページ" },
          { href: "/places", content: "会場一覧" },
          {
            href: `/places/${params.placeId}`,
            content: place && `${place.name} 編集ページ `,
            active: true,
          },
        ]}
      />
      <div className="place_section">
        {place == null ? (
          <Loading />
        ) : (
          <PlaceEdit
            place={place}
            events={events}
          />
        )}
      </div>
    </>
  );
}
