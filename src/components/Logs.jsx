import { useEffect, useState } from "react";
import Log from "./Log";



function Logs() {
  const [logs, setLogs] = useState([]);


  useEffect(()=> {
    fetch(`http://localhost:8888/logs`)
    .then((response) => response.json())
    .then( logs => setLogs(logs))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="logs">
      <section>
        <table>
          <tbody>
            {logs.map(log => {
              const id = log.id
              const index = logs.indexOf(log)
              return <Log key={id} log={log} index={index} />;
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default Logs;
