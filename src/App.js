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
import { FormBuilderProvider } from './Providers/FormBuilderProvider';
import FormBuilderPage from './Pages/FormBuilderPage/FormBuilderPage';
import PageBuilder from './Pages/FormBuilderPage/PageBuilder';
import { WidgetTypeProvider } from './Providers/WidgetTypeProvider';
import { FormsProvider } from './Providers/FormsProvider';
import Forms from './Pages/Forms/Forms';
import FormPreview from './Pages/FormPreview';
import ChooseTemplatePage from './Pages/ChooseTempalatePage/ChooseTemplatePage';
import AssignmentsPage from './Pages/AssignmentsPage/AssignmentsPage';
import AssignmentDetailsPage from './Pages/AssignmentsPage/AssignmentDetailsPage';
import CreateAssignmentPage from './Pages/AssignmentsPage/CreateAssignmentPage';
import { DraftAssignmentProvider } from './Providers/DraftAssignmentProvider';
import FieldVerifierDetailsPage from './Pages/FieldVerifierPage/FieldVerifierDetailPage';

const App = () => {
  return (
    <AuthProvider>
      <FieldVerifiersProvider>
        <AddRequestProvider>
          <FormsProvider>
          <FormBuilderProvider>
            <WidgetTypeProvider>
              <DraftAssignmentProvider>
              <div className="App">
                  <Router>
                    <Routes>
                      <Route exact path="/" element={<HomePage/>}/>
                      <Route path="/dashboard" element={<Dashboard/>}>
                          <Route index element={<SummaryPage/>}/>
                          <Route path="summary" element={<SummaryPage/>}/>
                          <Route path="fieldVerifierPage" element={<FieldVerifierPage/>}/>
                          <Route path="addFieldVerifierPage" element={<AddFieldVerifierPage/>}/>
                          <Route path="fieldVerifier">
                            <Route path=":id" element={<FieldVerifierDetailsPage/>}/>
                          </Route>
                          <Route path="forms" element={<Forms/>}>
                            <Route path=":id" element={<FormPreview/>}/>
                          </Route>
                          <Route path="assignment">
                            <Route path=":id" element={<AssignmentDetailsPage/>}/>
                            <Route path="create" element={<CreateAssignmentPage/>}/>
                          </Route>
                          <Route path="assignments" element={<AssignmentsPage/>}/>
                          <Route path="chooseTemplate" element={<ChooseTemplatePage/>}/>
                          <Route path="formBuilderPage" element={<FormBuilderPage/>}/>
                          <Route path="pageBuilder">
                            <Route path=":id" element={<PageBuilder/>}/>
                          </Route>
                      </Route>
                    </Routes>
                  </Router>
              </div>
              </DraftAssignmentProvider>
            </WidgetTypeProvider>
           </FormBuilderProvider>
          </FormsProvider>
          
        
         </AddRequestProvider>

      </FieldVerifiersProvider>
    </AuthProvider>
  );
}

export default App;