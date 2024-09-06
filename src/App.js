import logo from './logo.svg';
import './App.css';
import Posts from './component/Posts';
import { Auth0Provider } from '@auth0/auth0-react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import InputForm from './component/InputForm';
import Update from './component/Update';
import LoginButton from './component/LoginButton';
import LogoutButton from './component/LogoutButton';

function App() {
  return (
    <Auth0Provider
    domain="dev-xp6lkzqc7iypvpsw.us.auth0.com"
    clientId="WO8pZJADlWLCpEDecrBfgpvNjFTql2rC"
    authorizationParams={{
      redirect_uri: "https://login-fstack-client.vercel.app/"
    }}
  > 
    
    <div className="App">
      
      <Router>
        <LoginButton/>

            <Routes>
                <Route path="/" element={<Posts />} />
                
                <Route path="/update/:id" element={<Update />} />
            </Routes>
            <LogoutButton/>
        </Router>

    </div>
    </Auth0Provider>
  );
}

export default App;
