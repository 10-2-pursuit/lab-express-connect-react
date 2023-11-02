import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

function LogDetails() {
  const [log, setLog] = useState({});
  let { index } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    // Get the ID parameter from the URL
    const id = index;

    fetch(`http://localhost:8888/logs/${id}`)
      .then((response) => response.json())
      .then((log) => {
        setLog(log);
      })
      .catch(() => navigate("/not-found"));
  }, [index, navigate]);

  const handleDelete = () => {
    const httpOptions = { method: "DELETE" };

    // Get the ID parameter from the URL
    const id = index;

    // We know we need to delete a specific resource
    fetch(`http://localhost:8888/logs/${id}`, httpOptions)
      .then((res) => {
        console.log(res);
        alert("Hey - log was deleted! Way to go!");
        navigate('/logs');
      })
      .catch((err) => console.error(err));
  };

  return (
    <article>
      <h3>
        Captain's Name: {log.captainName}
      </h3>
      <h5>
        Title: {log.title}
      </h5>
      <h6>Post: {log.post}</h6>
      <p>
        Mistakes Were Made Today:{" "}
        {log.mistakesWereMadeToday ? <span role="img" aria-label="Fire">🔥</span> : 'No'}
      </p>
      <p>Days Since Last Crisis: {log.daysSinceLastCrisis}</p>
      <div className="showNavigation">
        <div>
          <Link to={`/logs`}>
            <button>Go Back</button>
          </Link>
        </div>
        <div>
          <Link to={`/logs/${index}/edit`}>
            <button>Edit Log</button>
          </Link>
        </div>
        <div>
          <button onClick={handleDelete}>Delete Log</button>
        </div>
        <div>
          <Link to={`/logs/new`}>
            <button>New Log</button>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default LogDetails;
