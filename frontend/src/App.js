import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Surah from "./pages/Surah";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddSurah from "./pages/AddSurah";
import EditSurah from "./pages/EditSurah";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/add" element={<AddUser />} />
          <Route path="/users/edit/:id" element={<EditUser />} />
          <Route path="/surah" element={<Surah />} />
          <Route path="/surah/add" element={<AddSurah />} />
          <Route path="/surah/edit/:id" element={<EditSurah />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
