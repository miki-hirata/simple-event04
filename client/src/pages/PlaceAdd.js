import { Breadcrumb } from "../components";
import { handleAddPlace } from "../api.js";

export function PlaceAddPage() {
  return (
    <>
    <Breadcrumb
      links={[
        { href: "/", content: "トップページ" },
        { href: "/places", content: "会場一覧" },
        {
          href: "/places/add",
          content: "新規会場追加",
          active: true,
        },
      ]}
    />
    <div className="card">
      <form onSubmit={handleAddPlace}> 
        <div className="card_head">
          <div className="main">
            <input type="text" name="name" placeholder="会場名" className="name_large"/>
          </div>
        </div>
        <div className="card_detail">
          <div className="memo">
            <textarea type="text" name="memo" placeholder="メモ"/>
          </div>
        </div>
        <button type="submit">追加</button>
      </form>
    </div>
    </>
  );
}
