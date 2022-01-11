import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Breadcrumb, Loading, Pagination, Comment, PlaceDetail } from "../components";
import { handleAddPlace } from "../api.js";

export function PlaceAddPage() {
  return (
    <>
      <form onSubmit={handleAddPlace}>
        <label htmlFor="name">名前</label>
        <input type="text" name="name"/>
        <label htmlFor="memo">メモ</label>
        <input type="text" name="memo"/>
        <button type="submit">追加</button>
      </form>
    </>
  );
}
