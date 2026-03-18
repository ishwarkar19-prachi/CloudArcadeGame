import { Outlet, Link, useLocation } from "react-router";
import { Gamepad2, Home, Library } from "lucide-react";

export default function Root() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="bg-black/30 backdrop-blur-md border-b border-purple-500/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Gamepad2 className="w-8 h-8 text-purple-400" />
              <span className="text-xl text-white">CloudArcade</span>
            </Link>
            
            <div className="flex gap-6">
              <Link 
                to="/" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/" 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </Link>
              <Link 
                to="/games" 
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                  location.pathname === "/games" 
                    ? "bg-purple-600 text-white" 
                    : "text-gray-300 hover:text-white hover:bg-white/10"
                }`}
              >
                <Library className="w-5 h-5" />
                <span>Games</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <Outlet />
    </div>
  );
}
