import { Button } from "@/components/ui/button";
import { SquareChevronRight, ChevronRight } from "lucide-react";
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
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-blue-50 transition-colors duration-200"
        >
          <SquareChevronRight style={{ width: "24px", height: "24px" }} />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-72 bg-white-500 border-r border-blue-100 p-6 font-poppins"
      >
        <SheetHeader>
          <SheetTitle className="text-3xl font-semiBold text-black-500">
            Reviewer
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8">
          <ul className="space-y-3">
            <li>
              <NavLink
                to="/dashboard/overview"
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white-500 shadow-md"
                      : "text-black-500 hover:bg-blue-50 hover:text-blue-500"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <span className="font-medium">Overview</span>
                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        isActive ? "text-white-500" : "text-blue-500"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/reply-to-reviews"
                className={({ isActive }: { isActive: boolean }) =>
                  `flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-500 text-white-500 shadow-md"
                      : "text-black-500 hover:bg-blue-50 hover:text-blue-500"
                  }`
                }
              >
                {({ isActive }: { isActive: boolean }) => (
                  <>
                    <span className="font-medium">Reply to reviews</span>
                    <ChevronRight
                      className={`w-4 h-4 ml-auto transition-transform duration-200 ${
                        isActive ? "text-white-500" : "text-blue-500"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
