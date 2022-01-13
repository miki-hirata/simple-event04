import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Breadcrumb, Loading, SearchPlace } from "../components";
import { getPlaces } from "../api.js";

export function PlaceListPage() {
  const [places, setPlaces] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  console.log(page);
  console.log(page);
  useEffect(() => {
    getPlaces({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setPlaces(data);
      console.log(data);
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
        <>
        <SearchPlace 
          places={places}
        />
        {/* <section className="place_section">
          {places.map((place) => {
            return <PlaceList key={place.id} place={place} />;
          })}
        </section> */}
        </>
      )}
    </>
  );
}
