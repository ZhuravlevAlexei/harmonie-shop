import './globalStyles/globals.css';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <h1>Not Found</h1>
      <p className="not-found-page__message">
        Looks like this page doesn&apos;t exist.
      </p>
    </div>
  );
}
