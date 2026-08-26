import axios from "axios";
import { MarketNewsResponse } from "../model/investment-model";
import { API_ENDPOINTS } from "../url";

export async function fetchInvestmentNews(
  params: string,
): Promise<MarketNewsResponse> {
  const response = await axios.get(API_ENDPOINTS.investment(params));

  return response.data;
}
