import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getOneLog, updateLog } from "../api/fetch";

function LogEditForm() {
  let { index } = useParams();
  const [log, setLog] = useState({
    captainName: "",
    title: "",
    post: "",
    mistakesWereMadeToday: false,
    daysSinceLastCrisis: 0,
  });
  const nav = useNavigate();

  useEffect(() => {
    getOneLog(index)
      .then((logData) =>{
        setLog(logData);
      })
      .catch((err) => {
        console.error(err)
      })
  },[index]);

  const handleTextChange = (event) => {
    setLog({ ...log, [event.target.id]: event.target.value });
  };

  const handleCheckboxChange = () => {
    setLog({ ...log, mistakesWereMadeToday: !log.mistakesWereMadeToday });
  };

  useEffect(() => {}, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateLog(index, log).then(() => {
                                        console.log("fetch success.");
                                        alert(`${index} is updated successfully.`);
                                        nav(`/logs/${index}`);
                                      }
                        ).catch((err) => console.error(err));
  };

  return (
    <div className="Edit">
      <form onSubmit={handleSubmit}>
      <label htmlFor="captainName">Captain's Name:</label>
        <input
          id="captainName"
          value={log.captainName}
          type="text"
          onChange={handleTextChange}
          placeholder="Captain's name"
          required
        />
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={log.title}
          placeholder="Title"
          onChange={handleTextChange}
        />
        <label htmlFor="post">Post:</label>
        <input
          id="post"
          type="text"
          name="post"
          value={log.post}
          placeholder="Post"
          onChange={handleTextChange}
        />
        <label htmlFor="mistakenWereMadeToday">Mistaken were made today?:</label>
        <input
          id="mistakenWereMadeToday"
          type="checkbox"
          onChange={handleCheckboxChange}
          checked={log.mistakesWereMadeToday}
        />
        <label htmlFor="daysSinceLastCrisis">Days since the last crisis:</label>
        <textarea
          id="daysSinceLastCrisis"
          name="daysSinceLastCrisis"
          value={log.daysSinceLastCrisis}
          onChange={handleTextChange}
          placeholder="put integer value here"
        />
        <br />

        <input type="submit" />
      </form>
      <Link to={`/bookmarks/${index}`}>
        <button>Nevermind!</button>
      </Link>
    </div>
  );
}

export default LogEditForm;
