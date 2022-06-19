import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { AuthProvider } from './Providers/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';
import FieldVerifierPage from './Pages/FieldVerifierPage/FieldVerifierPage';
import { FieldVerifiersProvider } from './Providers/FieldVerifiersProvider';

const App = () => {
  return (
    <AuthProvider>
      <FieldVerifiersProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>
              <Route path="/fieldVerifierPage" element={<FieldVerifierPage/>}/>
            </Routes>
          </Router>
        </div>
      </FieldVerifiersProvider>
    </AuthProvider>
    
  );
}

export default App;