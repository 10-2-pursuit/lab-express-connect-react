import { Link } from "react-router-dom";

function Log({ log, index }) {
  return (
    <tr>
      <td>
        <h6>Mistakes made today:</h6>
        {log.mistakesWereMadeToday ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td style={{ cursor: "alias" }}>
          {log.captainName}
      </td>
      <td>
        <Link to={`/logs/${index}`}>✏️{log.captainName} </Link>
      </td>
    </tr>
  );
}

export default Log;
