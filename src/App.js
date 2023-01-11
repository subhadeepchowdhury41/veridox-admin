import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
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
import { useAuthContext } from './Providers/AuthProvider';
import ResultPage from './Pages/AssignmentsPage/ResultPage';
import { createBrowserHistory } from 'history';
import VerifyAssignmentsPage from './Pages/VerifyPage/VerifyAssignmentsPage.tsx';
import VerifyAssignment from './Pages/VerifyPage/VerifyAssignment.tsx';
import ApprovedAssignments from './Pages/ApprovedAssignments/ApprovedAssignments.tsx';
import { ProfileProvider } from './Providers/ProfileProvider';

const history = createBrowserHistory();

const App = () => {
  const {user} = useAuthContext();
  return (
    <ProfileProvider>
      <FieldVerifiersProvider>
        <AddRequestProvider>
          <FormsProvider>
          <FormBuilderProvider>
            <WidgetTypeProvider>
              <DraftAssignmentProvider>
              <div className="App">
                  <Router history={history}>
                    <Routes>
                      <Route exact path="/" element={user !== null &&
                        Object.entries(user).length !== 0 ? <Dashboard/> : <HomePage/>}/>
                      <Route path="/dashboard" element={user !== null &&
                        Object.entries(user).length !== 0 ? <Dashboard/> : <HomePage/>}>
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
                            <Route path="response" element={<ResultPage/>}/>
                            <Route path="create" element={<CreateAssignmentPage/>}/>
                            <Route path="verify" element={<VerifyAssignmentsPage/>}/>
                            <Route path="approve" element={<ApprovedAssignments/>}/>
                          </Route>
                          <Route path="verify">
                            <Route path="result" element={<VerifyAssignment/>}/>
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
      </ProfileProvider>)
}

export default App;