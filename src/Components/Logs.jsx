import { useEffect, useState } from "react"
import Log from "./Log";
const API = "http://localhost:8080"

console.log(API)

function Logs() {
  const [logs, setLogs] = useState([]);
  useEffect(()=> {
    fetch(`${API}/logs`)
    .then((response) => response.json())
    .then( logs => setLogs(logs))
    .catch(error => console.log(error))
  }, [])

  return (
    <div className="Logs"style={{textAlign:'center'}} >
      <section >
        <table >
          <thead >
            <tr >
              <th></th>
              <th >Choose Pirate:</th>
            </tr>
          </thead>
          <tbody >
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
