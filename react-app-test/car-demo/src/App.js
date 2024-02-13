import './App.css';
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import React from 'react';
import Home from './pages/Home'
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import Admindashboard from './pages/Admindashboard';
 import Adminaddcar from './pages/Adminaddcar';
 import Displaydata from './pages/Displaydata';
 import Admincarmanage from './pages/Admincarmanage';
import Adminupdatecar from './pages/Adminupdatecar';
import Cardetails from './pages/Cardetails';
import Userdashboard from './pages/Userdashboard';
import Confirmation from './pages/Confirmation';
import { AuthProvider } from './components/Authcontext';
import { Provider } from 'react-redux'; // Import Provider
import store from './redux/Store';
import Adminlogin from './pages/Adminlogin';
function App() {
  return (
    <Provider store={store}>
    <div className="App" >
      <BrowserRouter>
      <AuthProvider>
        <Routes>

          <Route path='/' element={<Home> </Home>}></Route>
          <Route path='/userlogin' element={<UserLogin></UserLogin>}></Route>          
          <Route path='/usersignup' element={<UserSignup></UserSignup>}></Route>
           <Route path='/admindashboard' element={<Admindashboard></Admindashboard>}></Route>
           <Route path='/adminaddcar' element={<Adminaddcar></Adminaddcar>}></Route>
          <Route path='/displaydata' element={<Displaydata></Displaydata>}></Route>
          <Route path='/admincarmanage' element={<Admincarmanage></Admincarmanage>}></Route>
          <Route path='/adminupdatecar/:id' element={<Adminupdatecar></Adminupdatecar>}></Route>   
          <Route path='/cardetails/:id' element={<Cardetails></Cardetails>}></Route>
          <Route path='/userdashboard' element={<Userdashboard></Userdashboard>}></Route>
          <Route path='/confirmation' element={<Confirmation></Confirmation>}></Route>
          <Route path='/adminlogin' element={<Adminlogin></Adminlogin>}></Route>
          </Routes>
          </AuthProvider>
      </BrowserRouter>
    </div>
    </Provider>
  );
}

export default App;