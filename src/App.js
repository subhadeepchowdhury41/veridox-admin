import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { AuthProvider } from './Providers/AuthProvider';
import Dashboard from './Pages/Dashboard/Dashboard';
import FieldVerifierPage from './Pages/FieldVerifierPage/FieldVerifierPage';
import { FieldVerifiersProvider } from './Providers/FieldVerifiersProvider';
import SummaryPage from './Pages/SummaryPage/SummaryPage';
import AddFieldVerifierPage from './Pages/AddFieldVerifier/AddFieldVerifierPage';
import { AddRequestProvider } from './Providers/AddRequestProvider';

const App = () => {
  return (
    <AuthProvider>
      <FieldVerifiersProvider>
        <AddRequestProvider>
        <div className="App">
          <Router>
            <Routes>
              <Route exact path="/" element={<HomePage/>}/>
              <Route path="/dashboard" element={<Dashboard/>}>
                  <Route index element={<SummaryPage/>}/>
                  <Route path="summary" element={<SummaryPage/>}/>
                  <Route path="fieldVerifierPage" element={<FieldVerifierPage/>}/>
                  <Route path="addFieldVerifierPage" element={<AddFieldVerifierPage/>}/>
              </Route>
            </Routes>
          </Router>
        </div>
        </AddRequestProvider>

      </FieldVerifiersProvider>
    </AuthProvider>
    
  );
}

export default App;