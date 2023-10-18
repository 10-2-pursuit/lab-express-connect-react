import { Link } from "react-router-dom";

function Log({ log, index }) {
  return (
    
   
    <tr  >
      <td>
        <Link to={`/logs/${index}`}> ☠️ {log.captainName} </Link>
      </td>
      <td>
        <h6>Mistakes today:</h6>
        {log.mistakesWereMadeToday ? (
          <span>❎</span>
        ) : (
          <span>✅</span>
          //<span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      
    </tr>

    
  );
}

export default Log;
