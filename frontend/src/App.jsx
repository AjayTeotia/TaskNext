import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import { useAuthContext } from "./context/authContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/home"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />

        <Route
          path="/signup"
          element={authUser ? <Navigate to="/home" /> : <SignUpPage />}
        />

        <Route
          path="/login"
          element={authUser ? <Navigate to="/home" /> : <LoginPage />}
        />
      </Routes>
    </>
  );
}

export default App;
