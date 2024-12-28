import { Code } from "lucide-react";

export default function Navbar() {
  return (
    <header>
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="bg-gray-800 shadow-md"
      >
        <div className="container mx-auto px-4 py-2 sm:py-3">
          <div className="flex items-center">
            <Code
              className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 mr-2"
              aria-hidden="true"
            />
            <h1 className="text-lg sm:text-xl font-semibold text-gray-100">
              JSON Parser Pro
            </h1>
          </div>
        </div>
      </nav>
    </header>
  );
}
