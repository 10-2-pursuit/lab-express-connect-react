import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
const API = import.meta.env.VITE_BASE_URL;

function Log({ log, index }) {
  return (
    <tr>
      <td>
        {log.mistakenWereMadeToday ? (
          <span>⭐️</span>
        ) : (
          <span>&nbsp; &nbsp; &nbsp;</span>
        )}
      </td>
      <td style={{ cursor: "alias" }}>
        <Link to={`/logs/${index}`}>
          {log.captainName}
        </Link>
      </td>
      <td>
        <Link to={`/logs/${index}`}>✏️</Link>
      </td>
    </tr>
  );
}

export default Log;
