import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { getPlace } from "../api.js";
import { Breadcrumb, Loading, EditButton, PlaceEventList, FormatUpdate, FormatDate } from "../components";
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


function PlaceDetail({ place }) {
  return (    
    <div className="card">
      <div className="card_head">
        <div className="main">
            <p className="name_large"><span>{place.name}</span></p>
        </div>
      </div>
      <div className="card_detail">
        
        <div className="num">
          <span>ID</span>
          <span>{place.id}</span>
        </div>
        <div className="memo">
          <span>{place.memo}</span>
        </div>
        <div className="place_event">
          
          {place.Events.map((eve) => {
            return <PlaceEventList key={eve.id} event={eve} />;
          })}
        </div>
      </div>
      <FormatUpdate update={place.updatedAt}/>
      <FormDeletePlace place={place}/>
    </div>
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

export function PlaceDetailPage() {
  const [place, setPlace] = useState(null);
  const [events, setEvents] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  //編集モードかどうかによる出し分け
  const [edit, setEdit] = useState(false);
  let placeDetail;
  if (!edit){
    placeDetail = 
    <PlaceDetail
      place={place}
      events={events}
    />
  } else {
    placeDetail = 
    <PlaceEdit
      place={place}
      events={events}
    />
  }

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
          placeDetail
        )}
      </div>
      <EditButton edit={edit} setEdit={setEdit}/>
    </>
  );
}
