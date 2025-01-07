import React from "react";
import { LogOut } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface UserAvatarProps {
  fullName: string;
  onLogout: () => void;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ fullName, onLogout }) => {
  // Get initials from full name
  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 border border-blue-500">
            <AvatarFallback className="bg-blue-500 text-white-500 text-sm font-medium">
              {getInitials(fullName)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 bg-white-500 p-2" align="end">
        <div className="flex flex-col space-y-1">
          <p className="text-sm text-black-500 px-2 py-1">{fullName}</p>
          <Button
            variant="ghost"
            className="w-full justify-start text-black-500 hover:text-black-500 hover:bg-blue-900"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
