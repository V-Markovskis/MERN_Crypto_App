import './App.css';
import { Route, Routes } from 'react-router-dom';
import { AppContainer } from './Components/AppContainer.tsx';
import { ResetPassword } from './Components/ResetPassword.tsx';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
