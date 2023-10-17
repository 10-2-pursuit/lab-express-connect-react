import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const API = import.meta.env.VITE_API_URL

function LogDetails() {
  const [log, setLog] = useState([])
  let navigate = useNavigate()
  let { index } = useParams()

  useEffect(() => {
    fetch(`${API}/logs/${index}`)
    .then(response => response.json())
    .then(log => {
      console.log(log)
      setLog(log)
    })
    .catch(() => navigate("/not-found"))
  }, [index, navigate]);

  const handleDelete = () => {
    const httpOptions = {"method" : "DELETE"}
    fetch(`${API}/logs/${index}`, httpOptions)
      .then((res) => {
        console.log(res)
        alert("hey - log was deleted!  Way to GO!");
        navigate('/logs');
      })
      .catch((err) => console.error(err))
  }

  return (
    <article>
      <h3>
        {log.mistakesWereMadeToday ? <span>⭐️</span> : null} {log.captainName}
      </h3>

      <h6>
        {log.title}
      </h6>
      <p>
        {log.post}
      </p>
      <div>
        <p>Were mistakes made today:{log.mistakesWereMadeToday}</p>
        <p>Days Since Last Crisis:{log.daysSinceLastCrisis}</p>
      </div>


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

export default LogDetails