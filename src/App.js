// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// COMPONENTS
import NavBar from './Components/NavBar.jsx';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />
			</Router>
		</div>
	);
}

export default App;
