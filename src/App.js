import Landing from "./pages/Landing/Landing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile/Profile";
import Game from "./pages/Game/Game";
function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path = "/game/:id" element = {<Game/>} />
      </Routes>
    </Router>
  );
}
export default App;
