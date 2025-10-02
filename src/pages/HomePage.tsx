import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, TrendingUp, DollarSign, BarChart3, PieChart, Target, ArrowRight, BookOpen, LineChart, Shield, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const features = [{
    icon: Calculator,
    title: "Comprehensive Calculator Suite",
    description: "Eight specialized financial calculators covering all critical business metrics and planning scenarios"
  }, {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Dynamic visualizations and detailed reports to support data-driven financial decision-making"
  }, {
    icon: DollarSign,
    title: "Multi-Currency Support",
    description: "Seamless currency conversion between INR, USD, and EUR for global business operations"
  }, {
    icon: LineChart,
    title: "Real-Time Calculations",
    description: "Instant computation and updates as you adjust variables and input parameters"
  }, {
    icon: BookOpen,
    title: "Knowledge Resources",
    description: "Integrated formula documentation and financial modeling best practices"
  }, {
    icon: Shield,
    title: "Enterprise-Grade Reliability",
    description: "Built for accuracy and consistency across all financial calculations"
  }];
  const calculators = [{
    name: "Runway Calculator",
    desc: "Cash flow projections and sustainability analysis",
    icon: TrendingUp,
    color: "text-primary"
  }, {
    name: "CAC & LTV Analysis",
    desc: "Customer acquisition and lifetime value metrics",
    icon: Target,
    color: "text-success"
  }, {
    name: "Break-Even Analysis",
    desc: "Determine profitability thresholds and targets",
    icon: BarChart3,
    color: "text-accent"
  }, {
    name: "Unit Economics",
    desc: "Per-unit profitability and margin analysis",
    icon: DollarSign,
    color: "text-warning"
  }, {
    name: "Cap Table Management",
    desc: "Equity structure and dilution modeling",
    icon: PieChart,
    color: "text-destructive"
  }, {
    name: "Pricing & Tax Calculator",
    desc: "Strategic pricing with tax optimization",
    icon: Calculator,
    color: "text-primary"
  }];
  return <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                <Calculator className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Financial Analytics Platform</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Professional Financial Modeling</p>
              </div>
            </div>
            <Link to="/app">
              <Button className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-20 md:py-32 overflow-hidden">
        <div className="relative mx-auto max-w-4xl text-center space-y-8">
          <Badge variant="secondary" className="gap-2 px-4 py-2 text-sm font-medium">
            <Shield className="h-4 w-4 text-primary" />
            Enterprise-Grade Financial Modeling
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
            Professional Financial{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              <span className="text-white bg-clip-text ml-2" style={{
              WebkitTextFillColor: 'white'
            }}>Analysis Tools</span>
            </span>
            {" "}for Business
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive suite of financial calculators and analytics tools designed for 
            <span className="text-foreground font-medium"> business planning, analysis, and strategic decision-making</span>. 
            Professional-grade capabilities accessible to all.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
            <Link to="/app">
              <Button size="lg" className="gap-2 text-lg px-10 py-6">
                <Calculator className="h-5 w-5" />
                Access Platform
              </Button>
            </Link>
            <Link to="/app?tab=learning">
              <Button size="lg" variant="outline" className="gap-2 text-lg px-10 py-6">
                <BookOpen className="h-5 w-5" /> Documentation
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-6 pt-8 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-muted-foreground">No registration required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-muted-foreground">Completely free</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-success" />
              <span className="text-muted-foreground">Multi-currency</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="gap-2 px-4 py-1.5">
              <LineChart className="h-4 w-4 text-accent" />
              Platform Capabilities
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Comprehensive Financial Toolkit</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional-grade analytical tools built for precision, efficiency, and insight
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, idx) => <Card key={feature.title} className="stat-card p-8 hover:shadow-[var(--shadow-elevated)] transition-all hover:border-primary/50 group">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="p-3 rounded-xl gradient-primary group-hover:scale-110 transition-transform">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Calculators Preview */}
      <section className="container mx-auto px-4 py-20 bg-muted/20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="outline" className="gap-2 px-4 py-1.5">
              <Calculator className="h-4 w-4 text-primary" />
              Financial Calculators
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">Complete Analysis Suite</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Essential tools for financial planning, analysis, and strategic business decisions
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {calculators.map((calc, idx) => <Link to="/app" key={calc.name}>
                <Card className="stat-card p-6 group cursor-pointer transition-all hover:shadow-xl hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-lg bg-muted group-hover:bg-primary/10 transition-colors">
                      <calc.icon className={`h-7 w-7 ${calc.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">
                        {calc.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{calc.desc}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                  </div>
                </Card>
              </Link>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20 mb-16">
        <Card className="stat-card overflow-hidden border-2 border-primary/20 shadow-2xl">
          <div className="relative gradient-primary p-16 text-center text-white overflow-hidden">
            
            <div className="relative space-y-6">
              <Badge variant="secondary" className="gap-2 px-4 py-2 mb-4">
                <Shield className="h-4 w-4" />
                No Registration Required
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Ready to Optimize Your Financial Planning?
              </h2>
              <p className="text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed">
                Access professional-grade financial calculators and analytics tools. 
                Make informed, data-driven decisions with confidence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link to="/app">
                  <Button size="lg" variant="secondary" className="gap-2 text-lg px-10 py-6">
                    <Calculator className="h-5 w-5" />
                    Access Platform
                  </Button>
                </Link>
                <Link to="/app?tab=learning">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-10 py-6 bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all">
                    <BookOpen className="h-5 w-5" />
                    View Documentation
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Free Access</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>No Login Required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5" />
                  <span>Secure & Private</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg gradient-primary">
                  <Calculator className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">Financial Analytics Platform</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Professional financial modeling and analysis tools for informed business decisions.
              </p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <Link to="/app" className="hover:text-primary transition-colors">All Calculators</Link>
                <Link to="/app?tab=learning" className="hover:text-primary transition-colors">Learning Center</Link>
                <Link to="/app" className="hover:text-primary transition-colors">Get Started</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center">
              © 2025 Financial Analytics Platform. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-primary" />
              <span>Professional Financial Tools</span>
            </div>
          </div>
        </div>
      </footer>
    </div>;
};
export default HomePage;