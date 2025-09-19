// src/services/statusApi.ts
import { StatusType } from "@/components/StatusBadge";

export interface BackendSiteStatus {
  domain: string;
  display_name: string;
  status: StatusType;
  response_time?: number;
  uptime_24h?: number;
  uptime_7d?: number;
  uptime_30d?: number;
  last_checked: string;
  last_online?: string;
  ssl_valid?: boolean;
  ssl_expires?: string;
  status_code?: number;
  error_message?: string;
}

export interface BackendOverallStatus {
  overall_status: StatusType;
  total_sites: number;
  online_sites: number;
  warning_sites: number;
  offline_sites: number;
  last_updated: string;
}

export interface BackendStatusResponse {
  overall: BackendOverallStatus;
  sites: BackendSiteStatus[];
}

export interface DetailedSiteStatus {
  domain: string;
  display_name: string;
  current_status: {
    status: StatusType;
    response_time?: number;
    status_code?: number;
    ssl_valid?: boolean;
    ssl_expires?: string;
    error_message?: string;
    timestamp: string;
  };
  uptime: {
    "24h"?: number;
    "7d"?: number;
    "30d"?: number;
  };
  recent_history: Array<{
    status: StatusType;
    response_time?: number;
    status_code?: number;
    timestamp: string;
    error_message?: string;
  }>;
}

class StatusApiService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to localhost for development
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8010';
  }

  async getStatus(): Promise<BackendStatusResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Failed to fetch status:', error);
      throw error;
    }
  }

  async getSiteDetails(domain: string): Promise<DetailedSiteStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/site/${encodeURIComponent(domain)}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Failed to fetch details for ${domain}:`, error);
      throw error;
    }
  }

  async triggerManualCheck(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/check`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to trigger manual check:', error);
      throw error;
    }
  }

  async healthCheck(): Promise<{ status: string; timestamp: string; last_check?: string }> {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Health check failed:', error);
      throw error;
    }
  }
}

export const statusApi = new StatusApiService();