import axios from "axios";
import { NewsFeedResponse } from "../model/techNews-model";
import { API_ENDPOINTS } from "../url";

export async function fetchTechNews(params: string): Promise<NewsFeedResponse> {
  const response = await axios.get(API_ENDPOINTS.tech(params));

  return response.data;
}
