import { BrowserRouter, Routes, Route } from 'react-router-dom'
// BrowserRouter will wraps the everywhere we want to use the router.
// Routes component which will wraps all the individual routes.
// Route component to create a single route.

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar';
 

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Navbar />
      <div className='page'>
        <Routes>
          <Route
            path='/'
            element={<Home />}          // Home is page element/component that we want to render for / path
            />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;

