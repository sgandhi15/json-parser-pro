import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import JsonInput from "@/components/JsonInput";
import JsonDisplay from "@/components/JsonDisplay";

export default function Home() {
  const [jsonData, setJsonData] = useState<Record<string, any> | null>(null);
  const { toast } = useToast();

  const handleJsonSubmit = (input: string) => {
    try {
      const parsed = JSON.parse(input);
      setJsonData(parsed);
      toast({
        title: "Success",
        description: "JSON is valid and has been parsed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON. Please check your input.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-6">
          <JsonInput onSubmit={handleJsonSubmit} />
          <JsonDisplay data={jsonData} />
        </div>
      </main>
      <Toaster />
    </div>
  );
}
