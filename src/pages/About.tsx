import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Award, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ContactForm from "./ContactForm";

const About = () => {
  const [showContactPanel, setShowContactPanel] = useState(false);
  const team = [
    {
      name: "k.Mahesh Naidu",
      role: "Developer",
      bio: "Specialized in development and blockchain architecture",
    },
    {
      name: "B.Neeakanteswar Reddy",
      role: "IoT Engineer",
      bio: "Real-time Data processing with Native and React Frameworks",
    },
 
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 space-y-8">
        {/* Project Overview */}
        <div className="text-center space-y-4 mb-12">
          <Badge variant="outline" className="text-primary border-primary mb-4">
            <Award className="h-3 w-3 mr-1" />
            Hackathon Project
          </Badge>
          <h1 className="text-4xl font-bold">About PharmaChain</h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Developed for Elevium Hackathon, PharmaChain represents the future of pharmaceutical 
            supply chain management through innovative use of IoT and Blockchain technology.
          </p>
        </div>

        {/* Mission */}
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle className="text-2xl">Our Mission</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              To eliminate counterfeit drugs and ensure patient safety by creating a transparent, 
              secure, and efficient pharmaceutical supply chain using cutting-edge technology.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">1M+ Lives</h3>
                <p className="text-sm text-muted-foreground">At risk from counterfeit drugs annually</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">$200B+</h3>
                <p className="text-sm text-muted-foreground">Lost to pharmaceutical counterfeiting</p>
              </div>
              <div className="space-y-2">
                <h3 className="font-semibold text-primary">100%</h3>
                <p className="text-sm text-muted-foreground">Traceability with our solution</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technology Stack */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="text-2xl">Technology Stack</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-3 text-primary">Frontend</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React.js</Badge>
                  <Badge variant="secondary">Tailwind CSS</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Backend & Blockchain</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Node.js</Badge>
                  <Badge variant="secondary">Smart Contracts</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">IoT</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Real-Time Monitoring</Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3 text-primary">Database</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">Cloud Storage</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Team */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Meet the Team</h2>
          <div className="grid md:grid-cols-2 max-w-4xl mx-auto gap-6">
            {team.map((member, index) => (
              <Card key={index} className="bg-gradient-card hover:shadow-glow transition-all duration-300">
                <CardHeader>
                  <div className="h-24 w-24 rounded-full bg-gradient-primary mx-auto mb-4" />
                  <CardTitle className="text-center">{member.name}</CardTitle>
                  <Badge variant="outline" className="mx-auto w-fit">{member.role}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center mb-4">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Hackathon Info */}
        <Card className="bg-gradient-primary text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Elevium Hackathon 2025</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="opacity-90">
              This project was developed as part of the Elevium Hackathon, focusing on innovative 
              solutions for real-world problems in healthcare and pharmaceutical industries.
            </p>
              <div className="relative flex flex-wrap gap-4">
                <Button variant="secondary" className="group">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
                <Button
                  variant="secondary"
                  className="group"
                  onClick={() => setShowContactPanel((s) => !s)}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Us
                </Button>

                {/* Centered small glass panel that opens in the middle of the page */}
                {showContactPanel && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="relative pointer-events-auto rounded-2xl bg-white/6 border border-white/20 backdrop-blur-md shadow-xl p-6 w-[720px] max-w-full">
                          <Button variant="ghost" size="sm" className="absolute right-3 top-3" onClick={() => setShowContactPanel(false)} aria-label="Close contact panel">
                            <X className="h-4 w-4" />
                          </Button>
                          <ContactForm compact onClose={() => setShowContactPanel(false)} />
                        </div>
                  </div>
                )}
              </div>
          </CardContent>
        </Card>

        {/* Documentation */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Documentation & Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <span className="font-medium">Project Documentation</span>
                <Badge variant="outline">PDF</Badge>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <span className="font-medium">Technical Architecture</span>
                <Badge variant="outline">PDF</Badge>
              </a>
              <a href="#" className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                <span className="font-medium">Smart Contract Code</span>
                <Badge variant="outline">GitHub</Badge>
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
