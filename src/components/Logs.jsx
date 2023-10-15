import { useEffect, useState } from "react";
import Log from "./Log.jsx";
import { getAllLogs } from "../api/fetch.js";

function Logs() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // we need to get data 
    getAllLogs()
      .then((logsJson) => {
        console.log(logsJson)
        setLogs(logsJson);
      })
      .catch((err)=> {console.error(err);
  })},[]);

  return (
    <div className="Logs">
      <section>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Take me there</th>
              <th>See this bookmark</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, index) => {
              return <Log key={index} log={log} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Logs;
