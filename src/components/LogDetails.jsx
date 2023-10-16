import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { destroyLog, getOneLog } from "../api/fetch";

function LogDetails() {
  const [log, setLog] = useState([]);
  let { index } = useParams();
  const nav = useNavigate();

  useEffect(() => {
    getOneLog(index)
      .then((showLog) => {
        setLog(showLog);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [index]);

  const handleDelete = () => {
    destroyLog(index)
      .then((msg) => {
        console.log(`${index} is deleted successfully from the database`);
        alert(`${index} is deleted successfully from the database`);
        nav("/logs");
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <article>
      <h3>
        {log.mistakenWereMadeToday ? <span>⭐️</span> : null} {log.captainName}
      </h3>
      <h5>
        <span>
          <Link to={`/logs/${log.title}`}>{log.captainName}</Link>
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

export default LogDetails;
