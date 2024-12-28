import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface JsonInputProps {
  onSubmit: (input: string) => void;
}

export default function JsonInput({ onSubmit }: JsonInputProps) {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    onSubmit(input);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-gray-100">Input JSON</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Paste your JSON here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-h-[300px] font-mono text-sm bg-gray-700 text-gray-100 border-gray-600 focus:border-blue-400 focus:ring-blue-400"
        />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white"
        >
          Validate and Parse JSON
        </Button>
      </CardFooter>
    </Card>
  );
}
