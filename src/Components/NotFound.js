import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="Article">
      <h2>Not Found.</h2>
      <p>Couldn't find that article. Return to the <Link to={`/`}>homepage</Link>?</p>
    </div>
  );
}

export default NotFound;