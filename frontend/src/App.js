import { Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Home from './container/Home';
import { GoogleOAuthProvider } from '@react-oauth/google';

const App = () => {
  return (
    <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_API_TOKEN}`}>
      <Routes>
        <Route path="/*" element={<Login />} />
        <Route path="/login" element={<Home />} />
      </Routes>
    </GoogleOAuthProvider>
  );
};

export default App;
