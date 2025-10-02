import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Save, Trash2, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Scenario {
  id: string;
  name: string;
  timestamp: number;
  activeTab: string;
}

interface ScenarioManagerProps {
  activeTab: string;
  onLoadScenario: (scenarioId: string) => void;
}

export const ScenarioManager = ({ activeTab, onLoadScenario }: ScenarioManagerProps) => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [scenarioName, setScenarioName] = useState("");
  const [selectedScenario, setSelectedScenario] = useState<string>("");

  useEffect(() => {
    loadScenarios();
  }, []);

  const loadScenarios = () => {
    const saved = localStorage.getItem('finance-scenarios');
    if (saved) {
      setScenarios(JSON.parse(saved));
    }
  };

  const saveScenario = () => {
    if (!scenarioName.trim()) {
      toast.error("Please enter a scenario name");
      return;
    }

    const newScenario: Scenario = {
      id: Date.now().toString(),
      name: scenarioName,
      timestamp: Date.now(),
      activeTab,
    };

    const updated = [...scenarios, newScenario];
    setScenarios(updated);
    localStorage.setItem('finance-scenarios', JSON.stringify(updated));
    localStorage.setItem(`scenario-${newScenario.id}`, JSON.stringify({ activeTab }));
    
    toast.success(`Scenario "${scenarioName}" saved`);
    setScenarioName("");
  };

  const deleteScenario = (id: string) => {
    const updated = scenarios.filter(s => s.id !== id);
    setScenarios(updated);
    localStorage.setItem('finance-scenarios', JSON.stringify(updated));
    localStorage.removeItem(`scenario-${id}`);
    toast.success("Scenario deleted");
  };

  const loadScenario = (id: string) => {
    const scenario = scenarios.find(s => s.id === id);
    if (scenario) {
      onLoadScenario(id);
      toast.success(`Loaded scenario: ${scenario.name}`);
    }
  };

  return (
    <div className="border-b border-border bg-muted/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Input
              placeholder="Scenario name..."
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && saveScenario()}
              className="flex-1"
            />
            <Button onClick={saveScenario} size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
          </div>

          {scenarios.length > 0 && (
            <div className="flex items-center gap-2">
              <Select value={selectedScenario} onValueChange={(v) => {
                setSelectedScenario(v);
                loadScenario(v);
              }}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Load scenario..." />
                </SelectTrigger>
                <SelectContent>
                  {scenarios.map((scenario) => (
                    <SelectItem key={scenario.id} value={scenario.id}>
                      {scenario.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {selectedScenario && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Scenario</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this scenario? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => {
                        deleteScenario(selectedScenario);
                        setSelectedScenario("");
                      }}>
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
