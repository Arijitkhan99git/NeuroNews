import axios from "axios";
import { TrendsResponse } from "../model/trending-model";
import { API_ENDPOINTS } from "../url";

export async function fetchTrendingNews(
  params: string,
): Promise<TrendsResponse> {
  const response = await axios.get(API_ENDPOINTS.trends(params));

  return response.data;
}

export async function fetchTechNews(params: string): Promise<TrendsResponse> {
  const response = await axios.get(API_ENDPOINTS.tech(params));

  return response.data;
}
