import { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
const API = "http://localhost:8080"

function LogDetails() {
  const [log, setLog] = useState([])
  let navigate = useNavigate()
  let { index } = useParams()

  useEffect(() => {
    fetch(`${API}/logs/${index}`)
    .then(response => response.json())
    .then(log => {
      //console.log(log)
      setLog(log)
    })
    .catch(() => navigate("/not-found"))
  }, [index, navigate]);

  const handleDelete = () => {
    const httpOptions = {"method" : "DELETE"}
    fetch(`${API}/logs/${index}`, httpOptions)
      .then((res) => {
        //console.log(res)
        //alert("hey - log was deleted!  Way to GO!");
        navigate('/logs');
      })
      .catch((err) => console.error(err))
  }

  return (
    <article>
      <h3>
         {log.captainName}
         {log.mistakesWereMadeToday ? (
          <span>❎</span>
        ) : (
          <span>✅</span>
        )}
      </h3>

      <h6>
        title:  {log.title} - By {log.captainName}
      </h6>
      <p style={{fontStyle:'italic'}}>
        Quoted as:
        {log.post}
      </p>
      <div>
        <p>mistakes today:{log.mistakesWereMadeToday ? (
          <span>Mistakes were made today!!</span>
        ) : (
          <span>No mistakes today.</span>
        )}</p>
        <p>Days since last crisis: {log.daysSinceLastCrisis}</p>
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
