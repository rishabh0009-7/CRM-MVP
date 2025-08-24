import { 
  Home, 
  Users, 
  FileText, 
  BarChart3, 
  FileBarChart, 
  Settings,
  LogOut,
  User,
  Search
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const navigationItems = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Clients", url: "/clients", icon: Users },
  { title: "Proposals", url: "/proposals", icon: FileText },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
  { title: "Reports", url: "/reports", icon: FileBarChart },
];

export function AppSidebar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const getNavCls = (path: string) => {
    const active = currentPath === path;
    return `flex items-center w-full px-3 py-2 text-sm rounded-lg transition-colors ${
      active 
        ? "bg-green-500 text-white font-medium" 
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="fixed left-0 top-0 z-40 h-screen w-64 flex-col bg-gray-900 text-white flex">
      {/* Header */}
      <div className="flex items-center px-4 py-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-500">
          <span className="text-sm font-bold text-white">C</span>
        </div>
        <span className="ml-3 text-lg font-semibold text-white">Mini CRM</span>
      </div>

      {/* Search */}
      <div className="px-4 pb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search here..."
            className="w-full bg-gray-800 border-gray-700 pl-10 text-white placeholder-gray-400 focus:border-green-500"
          />
        </div>
      </div>

      {/* Main Menu */}
      <div className="flex-1 px-4">
        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            MAIN MENU
          </h3>
          <nav className="space-y-1">
            {navigationItems.map((item) => (
              <NavLink
                key={item.title}
                to={item.url}
                className={getNavCls(item.url)}
              >
                <item.icon className="h-4 w-4" />
                <span className="ml-3">{item.title}</span>
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="mb-6">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            SETTINGS
          </h3>
          <nav className="space-y-1">
            <NavLink
              to="/settings"
              className={getNavCls("/settings")}
            >
              <Settings className="h-4 w-4" />
              <span className="ml-3">Settings</span>
            </NavLink>
          </nav>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <div className="flex items-center">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-700">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <div className="ml-3 flex-1">
            <div className="text-sm font-medium text-white">
              {user?.email?.split('@')[0] || 'User'}
            </div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="mt-3 w-full justify-start text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="h-4 w-4" />
          <span className="ml-3">Sign Out</span>
        </Button>
      </div>
    </div>
  );
}