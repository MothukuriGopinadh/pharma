import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { ALL_ROLES } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Thermometer, Droplets, Gauge, MapPin, Clock, AlertTriangle, Package } from "lucide-react";
import { useShipments } from "@/context/ShipmentContext";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("day");

  // Simulated IoT sensor data
  const dayData = [
    { time: "00:00", temp: 22, humidity: 45, pressure: 1013 },
    { time: "04:00", temp: 21, humidity: 47, pressure: 1012 },
    { time: "08:00", temp: 23, humidity: 44, pressure: 1014 },
    { time: "12:00", temp: 25, humidity: 42, pressure: 1015 },
    { time: "16:00", temp: 24, humidity: 43, pressure: 1014 },
    { time: "20:00", temp: 22, humidity: 46, pressure: 1013 },
  ];

  const weekData = [
    { time: "Mon", temp: 22, humidity: 45, pressure: 1013 },
    { time: "Tue", temp: 23, humidity: 44, pressure: 1014 },
    { time: "Wed", temp: 24, humidity: 42, pressure: 1015 },
    { time: "Thu", temp: 23, humidity: 43, pressure: 1014 },
    { time: "Fri", temp: 22, humidity: 45, pressure: 1013 },
    { time: "Sat", temp: 21, humidity: 47, pressure: 1012 },
    { time: "Sun", temp: 22, humidity: 46, pressure: 1013 },
  ];

  const monthData = [
    { time: "Week 1", temp: 22, humidity: 45, pressure: 1013 },
    { time: "Week 2", temp: 23, humidity: 44, pressure: 1014 },
    { time: "Week 3", temp: 24, humidity: 43, pressure: 1015 },
    { time: "Week 4", temp: 23, humidity: 44, pressure: 1014 },
  ];

  const getData = () => {
    switch (timeRange) {
      case "week": return weekData;
      case "month": return monthData;
      default: return dayData;
    }
  };

  const currentMetrics = {
    temperature: 23,
    humidity: 44,
    pressure: 1014,
    location: "Distribution Center A",
    batchId: "BATCH-2025-001",
    lastUpdate: "2 minutes ago",
  };

  const alerts = [
    { type: "warning", message: "Temperature spike detected at 14:32", time: "2 hours ago" },
    { type: "success", message: "Batch BATCH-2025-001 verified", time: "5 hours ago" },
  ];

  const { shipments, approveShipment } = useShipments();
  const { currentRole } = useAuth();
  const { toast } = useToast();
  const [approvingTimestamp, setApprovingTimestamp] = useState<string | null>(null);
  const [approvingRole, setApprovingRole] = useState<string>(currentRole ?? "");

  // role -> primary stage mapping
  const roleStageMap: Record<string, string> = {
    "Ingredient Supplier": "ingredient",
    "Manufacturer": "manufacturing",
    "Repackage": "repackage",
    "Distributor": "distribution",
    "Pharmacy": "pharmacy",
    "FDA": "quality",
  };

  const orderedStages = [
    "ingredient",
    "manufacturing",
    "repackage",
    "quality",
    "warehouse",
    "distribution",
    "pharmacy",
  ];

  const visibleShipments = (() => {
    if (!currentRole) return shipments.slice().reverse(); // show all newest first when not logged in
    if (currentRole === "FDA") return shipments.slice().reverse(); // FDA sees all
    const roleStage = roleStageMap[currentRole] || "";
    const idx = orderedStages.indexOf(roleStage);
    const relatedStages = new Set<string>();
    if (idx !== -1) {
      relatedStages.add(orderedStages[idx]);
      if (idx - 1 >= 0) relatedStages.add(orderedStages[idx - 1]);
      if (idx + 1 < orderedStages.length) relatedStages.add(orderedStages[idx + 1]);
    }

    return shipments
      .filter((s) => {
        // include if actor role matches, or stage is directly/indirectly related
        if (s.role && s.role === currentRole) return true;
        if (s.stage && relatedStages.has(s.stage)) return true;
        return false;
      })
      .slice()
      .reverse();
  })();

  return (
    <div className="min-h-screen bg-gradient-subtle py-8">
      <div className="container mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">IoT Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring of pharmaceutical shipments</p>
          </div>
          <Tabs value={timeRange} onValueChange={setTimeRange} className="w-auto">
            <TabsList>
              <TabsTrigger value="day">Day</TabsTrigger>
              <TabsTrigger value="week">Week</TabsTrigger>
              <TabsTrigger value="month">Month</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Current Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Temperature</CardTitle>
              <Thermometer className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMetrics.temperature}°C</div>
              <Badge variant="outline" className="mt-2 text-success border-success">
                Normal Range
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Humidity</CardTitle>
              <Droplets className="h-4 w-4 text-accent" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMetrics.humidity}%</div>
              <Badge variant="outline" className="mt-2 text-success border-success">
                Optimal
              </Badge>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card hover:shadow-glow transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pressure</CardTitle>
              <Gauge className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentMetrics.pressure} hPa</div>
              <Badge variant="outline" className="mt-2 text-success border-success">
                Stable
              </Badge>
            </CardContent>
          </Card>
        </div>

        {/* Shipment Info */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle>Current Shipment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Location</p>
                  <p className="font-semibold">{currentMetrics.location}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="h-5 w-5 flex items-center justify-center">
                  <Badge variant="secondary">#</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Batch ID</p>
                  <p className="font-semibold">{currentMetrics.batchId}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Last Update</p>
                  <p className="font-semibold">{currentMetrics.lastUpdate}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Temperature Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={getData()}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card">
            <CardHeader>
              <CardTitle>Humidity & Pressure</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={getData()}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="humidity" 
                    stroke="hsl(var(--accent))" 
                    fill="hsl(var(--accent))"
                    fillOpacity={0.3}
                    name="Humidity (%)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="pressure" 
                    stroke="hsl(var(--warning))" 
                    fill="hsl(var(--warning))"
                    fillOpacity={0.3}
                    name="Pressure (hPa)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5" />
              <span>Recent Alerts</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50">
                  <Badge variant={alert.type === "warning" ? "destructive" : "default"}>
                    {alert.type}
                  </Badge>
                  <div className="flex-1">
                    <p className="font-medium">{alert.message}</p>
                    <p className="text-sm text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Shipments */}
        <Card className="bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Recent Shipments</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {visibleShipments.map((shipment, index) => (
                <div key={index} className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline" className="text-primary border-primary">
                        {shipment.batchId}
                      </Badge>
                      {shipment.role && (
                        <Badge variant="secondary">{shipment.role}</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      {shipment.status === 'approved' ? (
                        <Badge variant="outline" className="text-success border-success">Approved</Badge>
                      ) : null}
                      <span className="text-sm text-muted-foreground">{shipment.timestamp}</span>
                      {currentRole === 'FDA' && shipment.status !== 'approved' && (
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              // open confirmation inline
                              setApprovingTimestamp(shipment.timestamp);
                              setApprovingRole(currentRole ?? "");
                            }}
                          >
                            Approve
                          </Button>

                          {approvingTimestamp === shipment.timestamp && (
                            <div className="flex items-center gap-2 bg-muted/30 p-2 rounded-md">
                              <Select value={approvingRole} onValueChange={(v) => setApprovingRole(v)}>
                                <SelectTrigger className="w-40">
                                  <SelectValue placeholder="Select role" />
                                </SelectTrigger>
                                <SelectContent>
                                  {ALL_ROLES.map((r) => (
                                    <SelectItem key={r} value={r}>{r}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>

                              <Button
                                size="sm"
                                onClick={() => {
                                  if (approvingRole !== 'FDA') {
                                    toast({ title: 'Approval denied', description: 'Only FDA role may approve batches', });
                                    return;
                                  }
                                  approveShipment(shipment.timestamp, approvingRole || 'FDA');
                                  toast({ title: 'Batch approved', description: `${shipment.batchId} approved by ${approvingRole}` });
                                  setApprovingTimestamp(null);
                                }}
                              >
                                Confirm
                              </Button>

                              <Button size="sm" variant="ghost" onClick={() => setApprovingTimestamp(null)}>
                                Cancel
                              </Button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-3">
                    <div>
                      <p className="text-sm text-muted-foreground">Stage</p>
                      <p className="font-medium">{shipment.stage}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-medium">{shipment.location}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Carrier</p>
                      <p className="font-medium">{shipment.carrier}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Temperature</p>
                      <p className="font-medium">{shipment.temperature}°C</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Humidity</p>
                      <p className="font-medium">{shipment.humidity}%</p>
                    </div>
                    {shipment.notes && (
                      <div className="col-span-full">
                        <p className="text-sm text-muted-foreground">Notes</p>
                        <p className="font-medium">{shipment.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {visibleShipments.length === 0 && (
                <div className="text-center text-muted-foreground py-4">
                  No shipments available for your role. Add shipments from the Blockchain page.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
