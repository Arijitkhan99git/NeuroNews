import axios from "axios";
import { API_ENDPOINTS } from "../url";

export interface WeekDay {
  id: string;
  label: string;
  weekday: string;
  current: boolean;
}

export interface Week {
  id: string;
  label: string;
  year: number;
  weekNum: number;
  dateRange: string;
  current: boolean;
  periodType: string;
  days: WeekDay[];
}

export interface WeeksResponse {
  weeks: Week[];
}

export async function fetchWeeks(): Promise<WeeksResponse> {
  const response = await axios.get(API_ENDPOINTS.weeks);
  return response.data;
}
