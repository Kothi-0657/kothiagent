import { ReactNode } from "react";

export interface QuotationItem {
  id: string;
  area: string;
  service: string;
  description: string;
  quantity: number;
  rate: number;
  gstPercent: number; // ✅ NEW
}

export interface Quotation {
  agentName: ReactNode;
  totalAmount: any;
  created_at: string | number | Date;
  id: string;
  clientName: string;
  clientCode: string; // ✅ RENAMED
  projectLocation: string;
  projectType: string;
  items: QuotationItem[];
}
