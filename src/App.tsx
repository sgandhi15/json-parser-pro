import { Suspense, lazy, useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";

const JsonInput = lazy(() => import("@/components/JsonInput"));
const JsonDisplay = lazy(() => import("@/components/JsonDisplay"));

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

  useEffect(() => {
    // Add JSON-LD structured data
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "JSON Parser Pro",
      description:
        "Free online JSON validator, formatter, and viewer with real-time validation, dark mode, and copy functionality.",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      featureList: [
        "Real-time JSON validation",
        "JSON formatting",
        "Dark mode interface",
        "Copy functionality",
        "Responsive design",
      ],
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-gray-100">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <Suspense
            fallback={
              <div className="h-[300px] bg-gray-800 rounded-xl animate-pulse" />
            }
          >
            <JsonInput onSubmit={handleJsonSubmit} />
          </Suspense>
          <Suspense
            fallback={
              <div className="h-[300px] bg-gray-800 rounded-xl animate-pulse" />
            }
          >
            <JsonDisplay data={jsonData} />
          </Suspense>
        </div>
      </main>
      <Toaster />
    </div>
  );
}
