import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import LoginPage from './authPages/LoginPage/LoginPage';
import RegisterPage from './authPages/RegisterPage/RegisterPage';
import Dashboard from './Dashboard/Dashboard';
import './App.css'
import AlertNotification from './shared/components/AlertNotification';

function App() {

  return (
    <>
      <Router>{/* We create the routes were going to have in our application and asign what we want to show in that route*/}
        <Routes>
          <Route exact path='/login' element={<LoginPage/>} />
          <Route exact path='/register' element={<RegisterPage/>} />
          <Route exact path='/dashboard' element={<Dashboard/>} />
          <Route exact path='/' element= {<Navigate to="/dashboard" />}/>{/* For default we redirect to dashboard */}
        </Routes>
      </Router>
      <AlertNotification/>
    </>
  )
}

export default App
