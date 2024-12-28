import { Code } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center">
          <Code className="h-6 w-6 text-blue-400 mr-2" />
          <h1 className="text-xl font-semibold text-gray-100">
            JSON Parser Pro
          </h1>
        </div>
      </div>
    </nav>
  );
}
