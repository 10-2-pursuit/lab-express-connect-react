import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
const API = import.meta.env.VITE_API_URL


function LogEditForm() {
  let { index } = useParams();
  const navigate = useNavigate(); 
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0
  })
  
  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value })
  }

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday })
  }

  useEffect(() => {
    fetch(`${API}/logs/${index}`)
      .then(response => response.json())
      .then(log => {
        console.log(log)
        setBookmark(log)
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
          alert(`${log.name} has been updated!`);
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
      <Link to={`/logs/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  )
}

export default LogEditForm;
