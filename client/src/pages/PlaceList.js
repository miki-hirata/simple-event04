import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, Loading } from "../components";
import { getPlaces } from "../api.js";

function PlaceList({ place }) {
  return (    
    <Link
      key={place.id}
      className="card link"
      to={`/places/${place.id}`}
    >
      <div className="card_head">
        <div className="main">
            <p className="name_large"><span>{place.name}</span></p>
        </div>
      </div>
    </Link>
  );
}

export function PlaceListPage() {
  const [places, setPlaces] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getPlaces({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setPlaces(data);
    });
  }, [page]);

  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", content: "トップページ" },
          { href: "/places", content: "会場一覧", active: true },
        ]}
      />
      {places == null ? (
        <Loading />
      ) : (
        <section className="place_section">
          {places.map((place) => {
            return <PlaceList key={place.id} place={place} />;
          })}
        </section>
      )}
    </>
  );
}
