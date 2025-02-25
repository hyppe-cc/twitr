// Type definitions for Twitter-like data structure

/**
 * User information embedded within a tweet
 */
export interface TUser {
  id: number;
  username: string;
  display_name: string;
  profile_picture: string;
  bio: string;
  followers_count: number;
  verified: boolean;
}

/**
 * Media information for tweets with attached media
 */
export interface TMedia {
  media_url: string;
  media_type?: 'image' | 'video' | 'gif';
  width?: number;
  height?: number;
  alt_text?: string;
}

/**
 * Tweet entity containing content, metadata, and user information
 */
export interface TTweet {
  id: number;
  timestamp: string;
  content: string;
  likes: number;
  retweets: number;
  replies: number;
  views: number;
  has_media: boolean;
  media_url?: string;
  media?: TMedia;
  user: TUser;
  is_retweet?: boolean;
  retweet_from?: number;
  is_reply?: boolean;
  reply_to?: number;
  hashtags?: string[];
  mentions?: string[];
  urls?: string[];
  language?: string;
  source?: string;
  location?: {
    latitude: number;
    longitude: number;
    name: string;
  };
}

// Type for the complete dataset
export type TwitterData = TTweet[];
