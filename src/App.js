
import {browserRouter as Router, Routes, Route} from "react-router-dom";

import Edit from "./Pages/Edit"
import FourOFour from "./Paes/FourOFour"
import Home from "./Pages/Home"
import Index from "./Pages/Index"
import New from "./Pages/New"
import Show from "./Pages/Show"

import NavBar from "./Components/NavBar"

function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path="/" element ={<Home />} />
            <Route path="/colors" element={<Index />} />
            <Route path="/colors/new" element={<New />} />
            <Route path="/colors/:index" element={<Show />} />
            <Route path="/colors/:index/edit" element={<Edit />} />
            <Route path="*" element={<FourOFour />} />
          </Routes>
        </main>
      </Router>
    </div>
  )
}

export default App
