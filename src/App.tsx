import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Login from "./pages/Login";
import DashboardOverview from "./pages/Dashboard/DashboardOverview";
import Dashboard from "./pages/Dashboard/Dashboard";
import ReplyToReviews from "./pages/Dashboard/ReplyToReviews";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/overview" element={<DashboardOverview />} />
          <Route
            path="/dashboard/reply-to-reviews"
            element={<ReplyToReviews />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
