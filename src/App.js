import { CssVarsProvider } from '@mui/joy';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import store from './components/Store';

function App(props) {


  // let loggedin=
   const [status,setStatus] = useState(localStorage.getItem('logginStatus'));
  //  setLoggedin()
  const handleStatus = ()=>{
       setStatus(localStorage.getItem('logginStatus'))
  }
  return (
    <div className="App">
      <ToastContainer />
      <Provider store ={store}>
       <BrowserRouter>
      {status !== 'slfjflsdj-sdfhsdofjsd-sflsdf-wsrhwejf' ?
 <CssVarsProvider>
       <Login handleStatus={handleStatus}/>
 </CssVarsProvider> :
       <Dashboard handleStatus={handleStatus}/>}
       </BrowserRouter>
       </Provider>
    </div>
  );
}


export default App;
