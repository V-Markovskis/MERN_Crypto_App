import { Route, Routes } from 'react-router-dom';
import { ResetPassword } from '../Components/ResetPassword.tsx';
import { AppContainer } from '../Components/AppContainer.tsx';

export function RoutesApplication() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AppContainer />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default RoutesApplication;
