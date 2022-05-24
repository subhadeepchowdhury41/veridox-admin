import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { AuthProvider } from './Providers/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';


const App = () => {
  return (
    <AuthProvider>
      <div className="App">
        <Router>
          <Routes>
            <Route exact path="/" element={<HomePage/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
    
  );
}

export default App;