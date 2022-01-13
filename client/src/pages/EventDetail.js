import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Breadcrumb, Loading, FormatDate, FormatUpdate, SelectPlace} from "../components";
import { getEvent, handleDeleteEvent, handleEditEvent } from "../api.js";


function EventDeleteButton({ event }) {
  return (
    <>
      <form onSubmit={handleDeleteEvent}>
        <input type="hidden" name="id" value={event.id}/>
        <button type="submit">削除</button>
      </form>
    </>
  );
}

function EventDetail({ event }) {
  //編集モードかどうかによる出し分け(独立コンポーネントにするとエラー)
  const [edit, setEdit] = useState(false);
  const toggleEdit = () => setEdit(!edit);
  function EditButton() {
    if(edit){
      return <button type="submit">更新</button>
    } else {
      return <button onClick={toggleEdit}>編集</button>
    }
  }

  return (
    <div className="card">
      <form onSubmit={handleEditEvent}> 
        <div className="card_head">
          <FormatDate date={event.date} />
          <input type="date" name="date" defaultValue={event.date} disabled={!edit}/>
          <div className="main">    
            <input type="text" name="name" defaultValue={event.name} className="name_large" disabled={!edit}/>
            <Link
              key={event.id}
              className="name_large link"
              to={`/places/${event.Place.id}`}
            ><span>{event.Place.name}</span></Link>
            {/* <input type="number" name="placeId" defaultValue={event.placeId} placeholder="会場ID" /> */}
          </div>
        </div>
        <div className="card_detail">
          <div className="num">
            <span>ID</span>
            <span>{event.id}</span>
          </div>
          <div className="memo">
            <textarea type="text" name="memo" defaultValue={event.memo} disabled={!edit}/>
          </div>
        </div>
        {/* <SelectPlace /> */}
        <input type="hidden" name="id" value={event.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={event.updatedAt}/>
      <EventDeleteButton event={event}/>
    </div>
  );
}

export function EventDetailPage() {
  const [event, setEvent] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getEvent(params.eventId).then((data) => {
      setEvent(data);
    });
  }, [params.eventId]);

  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", content: "トップページ" },
          { href: "/events", content: "イベント一覧" },
          {
            href: `/events/${params.eventId}`,
            content: event && `${event.name} `,
            active: true,
          },
        ]}
      />
      <div className="event_section">
        {event == null ? (
          <Loading />
        ) : (
          <EventDetail
            event={event}
          />
        )}
      </div>
    </>
  );
}
