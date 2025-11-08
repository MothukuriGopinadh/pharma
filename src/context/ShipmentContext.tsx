import React, { createContext, useContext, useState } from 'react';

interface Shipment {
  batchId: string;
  stage: string;
  location: string;
  temperature: string;
  humidity: string;
  carrier: string;
  notes: string;
  role?: string; // role who added or is responsible for this shipment
  timestamp: string;
  status?: string; // e.g. 'pending' | 'approved'
  approvedBy?: string;
  approvedAt?: string;
}

interface ShipmentContextType {
  shipments: Shipment[];
  addShipment: (shipment: Omit<Shipment, 'timestamp'> & { role?: string }) => void;
  approveShipment: (timestamp: string, approver?: string) => void;
}

const ShipmentContext = createContext<ShipmentContextType | undefined>(undefined);

export function ShipmentProvider({ children }: { children: React.ReactNode }) {

  const STORAGE_KEY = "pharmachain:shipments";
  const [shipments, setShipments] = useState<Shipment[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const persist = (next: Shipment[]) => {
    setShipments(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  };

  const addShipment = (newShipment: Omit<Shipment, 'timestamp'> & { role?: string }) => {
    const s: Shipment = {
      ...newShipment,
      timestamp: new Date().toLocaleString(),
      status: 'pending',
    } as Shipment;
    persist([...shipments, s]);
  };

  const approveShipment = (timestamp: string, approver = 'FDA') => {
    const next = shipments.map((s) => {
      if (s.timestamp === timestamp) {
        return {
          ...s,
          status: 'approved',
          approvedBy: approver,
          approvedAt: new Date().toLocaleString(),
        } as Shipment;
      }
      return s;
    });
    persist(next);
  };

  return (
    <ShipmentContext.Provider value={{ shipments, addShipment, approveShipment }}>
      {children}
    </ShipmentContext.Provider>
  );
}

export function useShipments() {
  const context = useContext(ShipmentContext);
  if (context === undefined) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
}