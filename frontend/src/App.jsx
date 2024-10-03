import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/landingPage/LandingPage";
import LoginPage from "./pages/loginPage/LoginPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import HomePage from "./pages/homePage/HomePage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route path="/home" element={<HomePage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
