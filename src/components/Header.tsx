import { useNavigate } from "react-router-dom";
import UserAvatar from "./UserAvatar";

import { clearUser } from "@/redux/store/userSlice";
import { useAppDispatch, useAppSelector } from "@/redux/store/hooks";
import { Toast } from "./ui/toast";

const Header = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userName = useAppSelector((state) => state.user.name);

  const handleLogout = async () => {
    try {
      // Clear Redux store
      dispatch(clearUser());

      // Navigate to login
      navigate("/", { replace: true });

      // Show success message
      Toast({
        title: "Logged out successfully",
        duration: 2000,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 bg-white-500 shadow-md">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <h1 className="text-3xl font-semibold text-black-500">Reviewer</h1>
        </div>
        <UserAvatar fullName={userName} onLogout={handleLogout} />
      </div>
    </header>
  );
};

export default Header;
