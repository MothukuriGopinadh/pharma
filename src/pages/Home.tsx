import { ArrowRight, Shield, Activity, Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-pharma.jpg";

const Home = () => {
  const features = [
    {
      icon: Shield,
      title: "Supply Chain Security",
      description: "Track every drug from manufacturer to patient with immutable blockchain records",
    },
    {
      icon: Activity,
      title: "Real-Time IoT Monitoring",
      description: "Monitor temperature, humidity, and environmental conditions throughout transit",
    },
    {
      icon: Lock,
      title: "Counterfeit Prevention",
      description: "Verify authenticity and prevent fake medicines from entering the supply chain",
    },
    {
      icon: Zap,
      title: "FDA Compliance",
      description: "Automated compliance tracking and instant reporting for regulatory requirements",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-subtle py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  IoT + Blockchain Solution
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Securing Pharmaceutical Supply Chain
              </h1>
              <p className="text-lg text-muted-foreground">
                PharmaChain leverages IoT sensors and blockchain technology to ensure drug authenticity, 
                monitor environmental conditions, and provide complete transparency from manufacturer to patient.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/dashboard">
                  <Button size="lg" className="group">
                    View Dashboard
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <Link to="/blockchain">
                  <Button size="lg" variant="outline">
                    Explore Blockchain
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full"></div>
              <img
                src={heroImage}
                alt="Pharmaceutical supply chain"
                className="relative rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">The Problem</h2>
            <p className="text-lg text-muted-foreground">
              Traditional supply chains lack transparency, 
              making it impossible to verify drug authenticity or monitor storage conditions. This puts patient 
              safety at risk and costs the pharmaceutical industry billions.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Solution</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive platform combining IoT monitoring and blockchain verification 
              for complete supply chain visibility
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-glow transition-all duration-300 bg-gradient-card">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* System Architecture */}
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center items-center gap-4">
              {["Supplier", "Manufacturer", "Distributor", "Pharmacy", "Patient", "FDA"].map((stage, index) => (
                <div key={index} className="flex items-center">
                  <div className="px-6 py-3 rounded-lg bg-card border-2 border-primary font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-105">
                    {stage}
                  </div>
                  {index < 5 && (
                    <ArrowRight className="mx-2 h-6 w-6 text-primary" />
                  )}
                </div>
              ))}
            </div>
            <p className="text-center mt-8 text-muted-foreground">
              Every transaction is recorded on blockchain with IoT sensor data,
              creating an immutable audit trail
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Pharmaceutical Safety?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Experience the future of supply chain security with PharmaChain
          </p>
          <Link to="/dashboard">
            <Button size="lg" variant="secondary" className="group">
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-card border-t py-6 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground text-sm">
          © {new Date().getFullYear()} All rights reserved. Designed and
          Crafted by <span className="font-medium text-primary">PharmaChain with Nanochip × Elevium Solutions</span>.
        </div>
      </footer>
    </div>
  );
};

export default Home;
