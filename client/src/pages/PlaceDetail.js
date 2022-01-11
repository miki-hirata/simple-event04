import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { getPlace } from "../api.js";
import { Breadcrumb, Loading, Pagination } from "../components";
import { handleDeletePlace, handleEditPlace } from "../api.js";

function FormDeletePlace({ place }) {
  return (
    <>
      <form onSubmit={handleDeletePlace}>
        <input type="hidden" name="id" value={place.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}

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

function PlaceDetail({ place }) {
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
      <FormDeletePlace place={place}/>
      <Link to={`/places/edit/${place.id}`}><span>編集</span></Link>
    </div>
  );
}

export function PlaceDetailPage() {
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
            content: place && `${place.name} `,
            active: true,
          },
        ]}
      />
      <div className="place_section">
        {place == null ? (
          <Loading />
        ) : (
          <PlaceDetail
            place={place}
            events={events}
            page={page}
            perPage={perPage}
          />
        )}
        
        {/* <Pagination
          path={`/places/${place.id}`}
          page={page}
          perPage={perPage}
          count={comments.count}
        /> */}
      </div>
    </>
  );
}
