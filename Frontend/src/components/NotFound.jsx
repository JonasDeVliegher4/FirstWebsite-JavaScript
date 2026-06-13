import { Link, useLocation } from 'react-router-dom';

export default function NotFound() {
  const { pathname } = useLocation();

  return (
    <>
      <h1>Not found</h1>
      <div className="alert alert-warning">
        There is nothing at
        {' '}
        {pathname}
        ,
        {' '}
        <Link
          to="/"
          replace
          className="alert-link"
        >
          go back home
        </Link>
        .
      </div>
    </>
  );
}
