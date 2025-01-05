import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Sheet>
      {/* Trigger to open the sidebar */}
      <SheetTrigger asChild className=" h-full">
        <Button variant="outline" className="">
          <Menu />
        </Button>
      </SheetTrigger>

      {/* Sidebar Content */}
      <SheetContent side="left" className="w-64 bg-[#f6f8ff] p-4">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">Navigation</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 space-y-4">
          {/* Navigation Links */}
          <ul>
            <li>
              <NavLink
                to="/dashboard/overview"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-black hover:bg-blue-100"
                  }`
                }
              >
                Overview
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reply-to-reviews"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-md ${
                    isActive
                      ? "bg-blue-500 text-white"
                      : "text-black hover:bg-blue-100"
                  }`
                }
              >
                Reply to Reviews
              </NavLink>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
