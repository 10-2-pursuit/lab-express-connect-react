import { useState } from "react"
//import { Link, useParams, useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom"
const API = "http://localhost:8080"

function LogNewForm() {
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0
  })

  const navigate = useNavigate()
  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  const addLog = () => {
    const httpOptions = {
      "method" : "POST",
      "body" : JSON.stringify(log),
      "headers" : {
        "Content-type" : "application/json"
      }
    }
    fetch(`${API}/logs`, httpOptions)
      .then((res) => {
        console.log(res)
        alert(`${log.captainName} was added to the database!`);
        navigate('/logs');
      })
      .catch((err) => console.error(err))
  }

  const handleSubmit = (event) => {
    // this prevents the PAGE from RELOADING;
    event.preventDefault();
    addLog();
  };
  return (
    <div className="New">
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          value={log.captainName}
          type="text"
          onChange={handleTextChange}
          placeholder="Captain's Name"
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
        <label htmlFor="mistakes">Were mistakes made today:</label>
        <input
          id="mistakes"
          onChange={handleCheckboxChange}
          type="checkbox"
          checked={log.mistakesWereMadeToday}
        />
        <label htmlFor="crisis">Days since Last Crisis:</label>
        <input
          id="crisis"
          value={log.daysSinceLastCrisis}
          type="number"
          placeholder="#"
          onChange={handleTextChange}
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  )
}

export default LogNewForm
