import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getPlace } from "../api.js";
import { Breadcrumb, Loading, Pagination, Comment, PlaceDetail } from "../components";


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
