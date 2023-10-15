// DEPENDENCIES
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// PAGES
import Home from './Pages/Home.jsx';
import Index from './Pages/Index.jsx';

// COMPONENTS
import NavBar from './Components/NavBar.jsx';

function App() {
	return (
		<div className='App'>
			<Router>
				<NavBar />

				<main>
					<Routes>
						<Route path='/' element={<Home />} />
						<Route path='/logs' element={<Index />} />
					</Routes>
				</main>
			</Router>
		</div>
	);
}

export default App;
