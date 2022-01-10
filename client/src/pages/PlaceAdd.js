import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { addPlace } from "../api.js";
import { Breadcrumb, Loading, Pagination, Comment, PlaceDetail } from "../components";


export function PlaceAddPage() {
  return (
    <>
      <form action="/place/add" method="post">
        <label htmlFor="name">名前</label>
        <input type="text" name="name"/>
        <label htmlFor="memo">メモ</label>
        <input type="text" name="memo"/>
        <button type="submit">追加</button>
      </form>
    </>
  );
}
