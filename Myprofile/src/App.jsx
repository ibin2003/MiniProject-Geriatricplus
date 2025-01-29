import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/Login';
import SignUp from './components/SignUp';
import CreateProfile from './components/CreateProfile';
import ViewProfiles from './components/ViewProfiles';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div className="flex flex-col md:flex-row min-h-screen">
                  <div className="w-full md:w-1/2 p-4">
                    <CreateProfile />
                  </div>
                  <div className="w-full md:w-1/2 p-4 bg-gray-50">
                    <ViewProfiles />
                  </div>
                </div>
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
