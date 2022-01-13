import { Breadcrumb } from "../components";
import { handleAddEvent } from "../api.js";

export function EventAddPage() {
  return (
    <>
    <Breadcrumb
      links={[
        { href: "/", content: "トップページ" },
        { href: "/events", content: "イベント一覧" },
        {
          href: "/events/add",
          content: "新規イベント追加",
          active: true,
        },
      ]}
    />
    <div className="card">
      <form onSubmit={handleAddEvent}>
        <div className="card_head">
          <input type="date" name="date" placeholder="日付"/>
          <div className="main">
            <input type="text" name="name" placeholder="イベント名" className="name_large"/>
            <input type="number" name="placeId" placeholder="会場ID" className="name_large"/>
          </div>
        </div>
        <div className="card_detail">
          <div className="memo">
            <textarea type="text" name="memo" placeholder="メモ" />
          </div>
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
    </>
  );
}
