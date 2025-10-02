import { BookOpen, TrendingUp, DollarSign, Target, Calculator, Lightbulb } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const LearningTab = () => {
  const concepts = [
    {
      title: "Runway",
      icon: Calculator,
      formula: "Cash ÷ Monthly Burn",
      goodPractice: "Maintain at least 12-18 months of runway before fundraising. Less than 6 months is critical.",
      color: "text-primary"
    },
    {
      title: "Unit Economics",
      icon: DollarSign,
      formula: "Contribution Margin = Price − Variable Cost",
      goodPractice: "Positive unit economics are essential. Each unit sold should contribute to covering fixed costs.",
      color: "text-accent"
    },
    {
      title: "CAC & LTV",
      icon: TrendingUp,
      formula: "LTV:CAC Ratio = (ARPU × Margin × Lifespan) ÷ CAC",
      goodPractice: "Target LTV:CAC ratio > 3.0 for SaaS. Payback period should be < 12 months ideally.",
      color: "text-success"
    },
    {
      title: "Break-Even",
      icon: Target,
      formula: "Break-Even Units = Fixed Costs ÷ Contribution Margin",
      goodPractice: "Know your break-even point. It helps set realistic sales targets and understand scalability.",
      color: "text-warning"
    },
    {
      title: "Burn Multiple",
      icon: Lightbulb,
      formula: "(Monthly Burn × 12) ÷ Cash",
      goodPractice: "Lower is better. A burn multiple > 2 indicates aggressive cash usage relative to available funds.",
      color: "text-destructive"
    },
    {
      title: "NPV",
      icon: BookOpen,
      formula: "NPV = Σ (CF_t ÷ (1 + r)^t)",
      goodPractice: "Projects with NPV ≥ 0 at your discount rate are financially acceptable. Consider opportunity cost.",
      color: "text-primary"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Learning Center</h2>
        <p className="text-sm text-muted-foreground mt-1">Quick reference for key financial concepts and best practices</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {concepts.map((concept) => (
          <Card key={concept.title} className="stat-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <concept.icon className={`h-5 w-5 ${concept.color}`} />
                {concept.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">Formula:</p>
                <code className="text-sm bg-muted px-2 py-1 rounded">{concept.formula}</code>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">What good looks like:</p>
                <p className="text-sm text-foreground">{concept.goodPractice}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-lg">Tips for Using Finance Models</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-sm text-foreground">
          <p>• <strong>Save scenarios:</strong> Compare different assumptions side-by-side using the scenario manager</p>
          <p>• <strong>Be realistic:</strong> Use conservative estimates rather than optimistic projections</p>
          <p>• <strong>Iterate often:</strong> Update your models as you get actual data from the market</p>
          <p>• <strong>Focus on trends:</strong> Look for improving metrics over time, not just absolute values</p>
          <p>• <strong>Context matters:</strong> Industry benchmarks vary—understand what's normal for your sector</p>
        </CardContent>
      </Card>
    </div>
  );
};
