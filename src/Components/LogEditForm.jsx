import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
const API = "http://localhost:8080"


function LogEditForm() {
  let { index } = useParams()
  const navigate = useNavigate()
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  })
  
  const handleTextChange = (event) => {
    if(event.target.id !== "daysSinceLastCrisis"){
        console.log(String(event.target.value), "hi1")
        setLog({ ...log, [event.target.id]: event.target.value })
    }
    else{
        console.log(String(event.target.value),"hi2")
        setLog({ ...log, [event.target.id]: Number(event.target.value) })
    }
  }

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday })
  }

  useEffect(() => {
    fetch(`${API}/logs/${index}`)
      .then(response => response.json())
      .then(log => {
        //console.log(log)
        setLog(log)
    })
    .catch(() => navigate("/not-found"))
  }, [index, navigate]);

  const updateLog = () => {
    const httpOptions = {
      "method" : "PUT",
      "body" : JSON.stringify(log),
      "headers" : {
        "Content-type" : "application/json"
      }
    }

      fetch(`${API}/logs/${index}`, httpOptions)
        .then(() => { 
          //alert(`${log.captainName} has been updated!`);
          navigate(`/logs/${index}`)
        })
        .catch((err) => console.error(err))
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    updateLog();
  }
  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
        <label htmlFor="captainName">Captain's Name:</label>
        <input
          id="captainName"
          value={log.captainName}
          type="text"
          onChange={handleTextChange}
          placeholder={log.captainName}
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          value={log.title}
          type="text"
          placeholder="AKA"
          onChange={handleTextChange}
        />
        <label htmlFor="post">Post:</label>
        <textarea
          id="post"
          value={log.post}
          type="text"
          placeholder="favorite quote"
          onChange={handleTextChange}
        />
        <label htmlFor="mistakesWereMadeToday">Mistakes were made today:</label>
        <input
          id="mistakesWereMadeToday"
          type="checkbox"
          checked={log.mistakesWereMadeToday}
          onChange={handleCheckboxChange}
        />
        <label htmlFor="daysSinceLastCrisis">Days Since Last Crisis:</label>
        <input
          id="daysSinceLastCrisis"
          value={log.daysSinceLastCrisis}
          type="number"
          placeholder="#"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
      <Link to={`/logs/${index}`}>
        <button>Nevermind!</button>
      </Link>
      <div>
          {" "}
          <Link to={`/logs`}>
            <button>Back</button>
          </Link>
      </div>
    </div>
  )
}

export default LogEditForm
