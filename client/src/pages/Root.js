import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api.js";
import { Loading, EventList } from "../components";

/* export async function fetchImages() {
  const response = await fetch(`http://localhost:5000`);
  const data = await response.json();
  return data;
} */

export function RootPage() {
  const [events, setEvents] = useState(null);

  useEffect(() => {
    getEvents({ limit: 5 }).then((data) => {
      setEvents(data);
    });
  }, []);
  
  return (
    <>
      <section className="event_section">
        <div className="section_title">
          <h2><span>最新イベント（5件）</span></h2>
        </div>
        {events == null ? (
          <Loading />
        ) : (
          events.map((event) => {
            return <EventList key={event.id} event={event} />;
          })
        )}
      </section>      
    </>
  );
}