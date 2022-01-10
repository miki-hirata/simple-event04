import { Link } from "react-router-dom";

export function Pagination({ path, page, perPage, count }) {
  return (
    <nav className="page_area">
      <Link
        className="page_previous"
        to={`${path}?page=${page - 1}`}
        disabled={page === 1}
      >
        前の{perPage}件
      </Link>
      <Link
        className="page_next"
        to={`${path}?page=${page + 1}`}
        disabled={perPage * page >= count}
      >
        次の{perPage}件
      </Link>
    </nav>
  );
}
