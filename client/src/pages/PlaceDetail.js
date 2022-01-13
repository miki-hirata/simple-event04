import { useEffect, useState } from "react";
import { useLocation, useParams, Link } from "react-router-dom";
import { Breadcrumb, Loading, PlaceEventList, FormatUpdate} from "../components";
import { getPlace, handleDeletePlace, handleEditPlace } from "../api.js";


function PlaceDeleteButton({ place }) {
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
      <form onSubmit={handleEditPlace}> 
        <div className="card_head">
          <div className="main">
            <input type="text" name="name" defaultValue={place.name} className="name_large" disabled={!edit}/>
          </div>
        </div>
        <div className="card_detail">
          <div className="num">
            <span>ID</span>
            <span>{place.id}</span>
          </div>
          <div className="memo">
            <textarea type="text" name="memo" defaultValue={place.memo} disabled={!edit}/>
          </div>
        </div>
        <input type="hidden" name="id" value={place.id}/>
        <EditButton />
      </form>
      <FormatUpdate updateAt={place.updatedAt}/>
      <PlaceDeleteButton place={place}/>
    </div>
  );
}


function PlaceEvent({ place }) {
  return (
    <div className="place_event">
      <h2 className="sub_title"><span>この会場で行ったイベント</span></h2>
      {place.Events.map((eve) => {
        return <PlaceEventList key={eve.id} event={eve} />;
      })}
    </div>
  );
}


export function PlaceDetailPage() {
  const [place, setPlace] = useState(null);

  const params = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getPlace(params.placeId).then((data) => {
      setPlace(data);
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
          <>
            <PlaceDetail place = {place}/>
            {place.Events[0] &&
            <PlaceEvent place={place}/>}
          </>
        )}
      </div>
    </>
  );
}
