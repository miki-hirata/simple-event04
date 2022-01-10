import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getEvent } from "../api.js";
import { Breadcrumb, Loading, Pagination, Comment, EventDetail } from "../components";

function Form({ onSubmit }) {
  async function handleFormSubmit(event) {
    event.preventDefault();
    if (onSubmit) {
      const record = {
        title: event.target.elements.title.value,
        comment: event.target.elements.comment.value,
      };
      event.target.elements.title.value = "";
      event.target.elements.comment.value = "";
      onSubmit(record);
    }
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="field">
        <div className="control">
          <label className="label">タイトル</label>
          <div className="control">
            <input name="title" className="input" required disabled />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <label className="label">コメント</label>
          <div className="control">
            <textarea name="comment" className="textarea" required disabled />
          </div>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button type="submit" className="button is-warning" disabled>
            レビューを投稿
          </button>
        </div>
        <p className="help">ログインが必要です。</p>
      </div>
    </form>
  );
}
/* 
function Event({ event, comments, page, perPage }) {
  return (
    <>
      <article className="box">
        <h3 className="title is-5">{event.name}</h3>
        <div className="columns">
          <div className="column is-6">
            <figure className="image is-square">
              <img
                src={event.image || "/images/events/noimage.png"}
                alt={event.name}
              />
            </figure>
          </div>
          <div className="column is-6">
            <figure className="image is-square">
              <div
                className="has-ratio"
                dangerouslySetInnerHTML={{ __html: event.map }}
              ></div>
            </figure>
          </div>
        </div>
      </article>
      <div className="box">
        {comments.rows.length === 0 ? (
          <p>レビューがまだありません。</p>
        ) : (
          <>
            <div className="block">
              <p>{comments.count}件のレビュー</p>
            </div>
            <div className="block">
              {comments.rows.map((comment) => {
                return <Comment key={comment.id} comment={comment} />;
              })}
            </div>
            <div className="bread_area">
              <Pagination
                path={`/events/${event.id}`}
                page={page}
                perPage={perPage}
                count={comments.count}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
 */

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
      console.log(data);
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
            page={page}
            perPage={perPage}
          />
        )}
        <div className="box">
          <Form />
        </div>
        {/* <Pagination
          path={`/events/${event.id}`}
          page={page}
          perPage={perPage}
          count={comments.count}
        /> */}
      </div>
    </>
  );
}
