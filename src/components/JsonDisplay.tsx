import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Copy } from "lucide-react";

interface JsonDisplayProps {
  data: Record<string, any> | null;
}

const JsonDisplay = memo(function JsonDisplay({ data }: JsonDisplayProps) {
  const { toast } = useToast();

  const copyToClipboard = (value: any) => {
    const textToCopy =
      typeof value === "string" ? value : JSON.stringify(value);
    navigator.clipboard.writeText(textToCopy).then(
      () => {
        toast({
          title: "Copied!",
          description: "Value copied to clipboard.",
        });
      },
      (err) => {
        console.error("Failed to copy: ", err);
        toast({
          title: "Error",
          description: "Failed to copy value.",
          variant: "destructive",
        });
      }
    );
  };

  const renderJsonItem = (key: string, value: any, depth = 0) => {
    const indent = "  ".repeat(depth);

    if (typeof value === "object" && value !== null) {
      return (
        <div key={key} className="ml-4">
          <span className="font-semibold text-blue-400">{key}: </span>
          {Array.isArray(value) ? "[" : "{"}
          {Object.entries(value).map(([k, v]) =>
            renderJsonItem(k, v, depth + 1)
          )}
          {indent}
          {Array.isArray(value) ? "]" : "}"}
        </div>
      );
    }

    return (
      <div key={key} className="flex items-center space-x-2 ml-4">
        <span className="font-semibold text-blue-400">{key}: </span>
        <span className="text-gray-300">{JSON.stringify(value)}</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => copyToClipboard(value)}
          className="p-1 h-auto text-gray-400 hover:text-gray-100 hover:bg-gray-700"
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy value</span>
        </Button>
      </div>
    );
  };

  if (!data) {
    return (
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-100">Parsed JSON</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-gray-400">No valid JSON data to display.</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg text-gray-100">
          Parsed JSON
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 sm:p-6 pt-0">
        <div className="bg-gray-700 p-3 sm:p-4 rounded-lg overflow-auto max-h-[300px] sm:max-h-[500px]">
          <pre className="text-xs sm:text-sm font-mono text-gray-100">
            {Object.entries(data).map(([key, value]) =>
              renderJsonItem(key, value)
            )}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
});

export default JsonDisplay;
