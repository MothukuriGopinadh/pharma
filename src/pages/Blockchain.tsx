import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Package, Truck, Building2, Users, FileCheck, Plus } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useAuth, ALL_ROLES } from "@/context/AuthContext";
import { useShipments } from "@/context/ShipmentContext";

const Blockchain = () => {
  const [showForm, setShowForm] = useState(false);
  const [newShipment, setNewShipment] = useState({
    batchId: "",
    stage: "",
    location: "",
    temperature: "",
    humidity: "",
    carrier: "",
    notes: "",
    role: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewShipment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStageChange = (value: string) => {
    setNewShipment(prev => ({
      ...prev,
      stage: value
    }));
  };

  const handleRoleChange = (value: string) => {
    setNewShipment(prev => ({
      ...prev,
      role: value
    }));
  };

  const { addShipment } = useShipments();
  const { currentRole } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // If no role selected, default to currently logged-in role
    const toAdd = {
      ...newShipment,
      role: newShipment.role || (currentRole ?? "")
    };
    addShipment(toAdd as any);
    alert('Shipment details updated successfully!');
    setShowForm(false);
    setNewShipment({
      batchId: "",
      stage: "",
      location: "",
      temperature: "",
      humidity: "",
      carrier: "",
      notes: "",
      role: ""
    });
  };

  const transactions = [
    {
      id: 1,
      hash: "0x7d9f2e4a...8b3c1f6d",
      stage: "Manufacturing",
      actor: "PharmaCorp Ltd",
      timestamp: "2025-11-05 08:30:00 PM",
      status: "verified",
      icon: Building2,
      details: "Batch BATCH-2024-001 manufactured and quality tested",
    },
    {
      id: 2,
      hash: "0x4c8e1b9d...5f2a7e3c",
      stage: "Quality Approval",
      actor: "FDA Inspector",
      timestamp: "2025-11-06 14:45:00 AM",
      status: "verified",
      icon: FileCheck,
      details: "FDA compliance verified, approved for distribution",
    },
    {
      id: 3,
      hash: "0x9a3f7c2e...1d8b4e6a",
      stage: "Warehouse Storage",
      actor: "MediStore Logistics",
      timestamp: "2025-11-06 09:15:00 AM",
      status: "verified",
      icon: Package,
      details: "Stored at optimal conditions: 22°C, 45% humidity",
    },
    {
      id: 4,
      hash: "0x6e2d9f5a...3c7b1e8d",
      stage: "Distribution",
      actor: "QuickMed Transport",
      timestamp: "2025-11-06 10:30:29 AM",
      status: "verified",
      icon: Truck,
      details: "In transit to Distribution Center A - IoT monitoring active",
    },
    {
      id: 5,
      hash: "0x5f8c2a1d...9e4b6d7c",
      stage: "Pharmacy Received",
      actor: "HealthPlus Pharmacy",
      timestamp: "2025-11-06 18:30:00 AM",
      status: "pending",
      icon: Users,
      details: "Delivery scheduled - awaiting confirmation",
    },
  ];

  const smartContract = {
    address: "Kalasalingam University, Krishnankoil",
    name: "Mahesh Naidu",
    version: "1.0.0",
    deployed: "06-11-2025",
  };

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Blockchain Ledger</h1>
          <p className="text-muted-foreground">Immutable transaction history for supply chain transparency</p>
        </div>

        {/* Smart Contract Info */}
        <Card className="bg-gradient-card border-primary/20">
          <CardHeader>
            <CardTitle>Smart Contract Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Contract Address</p>
                <p className="font-mono text-sm font-semibold mt-1">{smartContract.address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contract Name</p>
                <p className="font-semibold mt-1">{smartContract.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Version</p>
                <p className="font-semibold mt-1">{smartContract.version}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Deployed</p>
                <p className="font-semibold mt-1">{smartContract.deployed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Timeline */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Transaction History - BATCH-2024-001</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {transactions.map((tx, index) => {
                const Icon = tx.icon;
                return (
                  <div key={tx.id} className="relative">
                    {/* Timeline connector */}
                    {index < transactions.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
                    )}
                    
                    <div className="flex gap-4">
                      {/* Icon */}
                      <div className="relative z-10 flex-shrink-0">
                        <div className="h-12 w-12 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center">
                          <Icon className="h-6 w-6 text-primary" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-8">
                        <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-lg">{tx.stage}</h3>
                              <p className="text-sm text-muted-foreground">{tx.actor}</p>
                            </div>
                            {tx.status === "verified" ? (
                              <Badge variant="outline" className="text-success border-success">
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                                Verified
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-warning border-warning">
                                Pending
                              </Badge>
                            )}
                          </div>

                          <Separator />

                          <p className="text-sm">{tx.details}</p>

                          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                            <div>
                              <span className="font-medium">Hash:</span>{" "}
                              <span className="font-mono">{tx.hash}</span>
                            </div>
                            <div>
                              <span className="font-medium">Timestamp:</span>{" "}
                              {tx.timestamp}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Current Shipment Details */}
        <Card className="bg-gradient-card">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Current Shipment Details</CardTitle>
            <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
              <Plus className="h-4 w-4 mr-2" />
              {showForm ? 'Cancel' : 'Update Details'}
            </Button>
          </CardHeader>
          <CardContent>
            {showForm ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="batchId">Batch ID</Label>
                    <Input
                      id="batchId"
                      name="batchId"
                      value={newShipment.batchId}
                      onChange={handleInputChange}
                      placeholder="Enter batch ID"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="stage">Current Stage</Label>
                    <Select value={newShipment.stage} onValueChange={handleStageChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="ingredient">Ingredient Supply</SelectItem>
                        <SelectItem value="repackage">Repackage</SelectItem>
                        <SelectItem value="quality">Quality Approval</SelectItem>
                        <SelectItem value="warehouse">Warehouse Storage</SelectItem>
                        <SelectItem value="distribution">Distribution</SelectItem>
                        <SelectItem value="pharmacy">Pharmacy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Actor Role</Label>
                    <Select value={newShipment.role} onValueChange={handleRoleChange} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ALL_ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Current Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={newShipment.location}
                      onChange={handleInputChange}
                      placeholder="Enter current location"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="carrier">Carrier/Handler</Label>
                    <Input
                      id="carrier"
                      name="carrier"
                      value={newShipment.carrier}
                      onChange={handleInputChange}
                      placeholder="Enter carrier name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature (°C)</Label>
                    <Input
                      id="temperature"
                      name="temperature"
                      type="number"
                      value={newShipment.temperature}
                      onChange={handleInputChange}
                      placeholder="Enter temperature"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="humidity">Humidity (%)</Label>
                    <Input
                      id="humidity"
                      name="humidity"
                      type="number"
                      value={newShipment.humidity}
                      onChange={handleInputChange}
                      placeholder="Enter humidity"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={newShipment.notes}
                    onChange={handleInputChange}
                    placeholder="Enter any additional notes"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Update
                </Button>
              </form>
            ) : (
              <div className="text-center text-muted-foreground">
                Click "Update Details" to add new shipment information
              </div>
            )}
          </CardContent>
        </Card>

        {/* Transaction Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">5</div>
              <p className="text-xs text-muted-foreground mt-1">For this batch</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Verified Stages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-success">4/5</div>
              <p className="text-xs text-muted-foreground mt-1">80% complete</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Network Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">Active</div>
              <p className="text-xs text-muted-foreground mt-1">All nodes operational</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Blockchain;
