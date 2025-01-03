import React,{ useState, useEffect } from "react";

import { useTheme } from "next-themes";
import { Switch } from "@components/ui/switch";
import { Moon, Sun } from "lucide-react";
import { PipelineToolbar } from "./custom-components/toolbar";
import { PipelineUI } from "./custom-components/ui";
import { SubmitButton } from "./custom-components/submit";
import ResponseDialog from "./custom-components/response-dialog";
import axios from "axios";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-2">
      <Sun className="h-4 w-4" />
      <Switch
        checked={theme === 'dark'}
        onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      />
      <Moon className="h-4 w-4" />
    </div>
  );
};

const App = () => {
  const [pipelineData, setPipelineData] = useState({ nodes: [], edges: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const isSubmitDisabled = !pipelineData.nodes.length;

  const handleSubmit = async () => {
    if (isSubmitDisabled) return;
    setDialogOpen(true);
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("pipeline", JSON.stringify(pipelineData));

      const res = await axios.post(
        "http://localhost:8000/pipelines/parse",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      setResponse(res.data);
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      setResponse({ error: "Submission failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-primary">Pipeline Builder</h1>
          <ThemeSwitch />
        </div>
        <div className="bg-card rounded-lg shadow-sm border border-border">
          <PipelineToolbar />
          <div className="border-t border-border">
            <PipelineUI setPipelineData={setPipelineData} />
          </div>
          <div className="p-4 border-t border-border">
            <SubmitButton isLoading={isLoading} onSubmit={handleSubmit} disabled={isSubmitDisabled} />
          </div>
        </div>
        {response && (
          <ResponseDialog
            isOpen={dialogOpen}
            setIsOpen={setDialogOpen}
            response={response}
          />
        )}
      </div>
    </div>
  );
};

export default App;