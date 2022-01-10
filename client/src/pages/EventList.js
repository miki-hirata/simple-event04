import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Breadcrumb, Loading, Pagination, EventList } from "../components";
import { getEvents } from "../api.js";

export function EventListPage() {
  const [events, setEvents] = useState(null);

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const perPage = 5;
  const page = +query.get("page") || 1;

  useEffect(() => {
    getEvents({
      limit: perPage,
      offset: (page - 1) * perPage,
    }).then((data) => {
      setEvents(data);
    });
  }, [page]);

  return (
    <>
      <Breadcrumb
        links={[
          { href: "/", content: "トップページ" },
          { href: "/events", content: "イベント一覧", active: true },
        ]}
      />
      {events == null ? (
        <Loading />
      ) : (
        <section className="event_section">
          {events.map((event) => {
            return <EventList key={event.id} event={event} />;
          })}
          <Pagination
            path="/events"
            page={page}
            perPage={perPage}
            count={events?.count}
          />
        </section>
      )}
    </>
  );
}
