import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function LogDetails() {
  const [log] = useState([]);
  let { index } = useParams();

  useEffect(() => {}, []);
  const handleDelete = () => {};
  return (
    <article>
      <h3>
        {log.mistakenWereMadeToday ? <span>⭐️</span> : null} {bookmark.name}
      </h3>
      <h5>
        <span>
          <a href={log.title}>{log.captainName}</a>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {log.title}
      </h5>
      <h6>{log.post}</h6>
      <p>{log.daysSinceLastCrisis}</p>
      <div className="showNavigation">
        <div>
          {" "}
          <Link to={`/logs`}>
            <button>Back</button>
          </Link>
        </div>
        <div>
          {" "}
          <Link to={`/logs/${index}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
        <div>
          {" "}
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>
  );
}

export default BookmarkDetails;
