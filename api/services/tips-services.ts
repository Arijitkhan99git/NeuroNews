import axios from "axios";
import { AiTipsResponse } from "../model/tip-model";
import { API_ENDPOINTS } from "../url";

export async function fetchAiTips(params: string): Promise<AiTipsResponse> {
  const response = await axios.get(API_ENDPOINTS.tips(params));

  return response.data;
}
