export interface VideoLangResponse {
    de: VideoResponse[];
    en: VideoResponse[];
    zh: VideoResponse[];
    fr: VideoResponse[];
    es: VideoResponse[];
    pt: VideoResponse[];
    ja: VideoResponse[];
    ko: VideoResponse[];
}

export interface VideoResponse {
    id: number;
    videoId: string;
    title: string;
    summary: string;
    channelName: string;
    thumbnailUrl: string;
    publishedAt: string;
    durationSeconds: number;
    durationFormatted: string;
    viewCount: number;
    likeCount: number;
    tags?: any;
    category: string;
}