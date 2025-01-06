import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className=" flex flex-row p-4 ">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
