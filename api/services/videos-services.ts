import axios from "axios";
import { VideoLangResponse } from "../model/videos-model";
import { API_ENDPOINTS } from "../url";

export async function fetchVideos(params: string): Promise<VideoLangResponse> {
    const response = await axios.get(API_ENDPOINTS.videos(params));
    return response.data;
}
