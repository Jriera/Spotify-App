import { Track,Playlist,Album,Artist,ExternalUrls } from "./music.interfaces";

export interface TokenResponse {
    access_token: string;
    expires_in: number;
    token_type: string;
    refresh_token: string;
    scope: string;
}

export interface PlaylistResponse {
    items: PlaylistItem[];
    next: string;
    total: number;

}

export interface TopTracksResponse {
    items: TopSong[];
    next: string;
    total: number;
}

export interface TopSong {
    album: Album;
    artists: Artist[];
    duration_ms: number;
    external_urls: ExternalUrls;
    id: string;
    name: string;
    popularity: number;
    preview_url: string;
}

export interface trackResponse {
    items: TrackItem[];
    next:string;
    total:number;
}

interface TrackItem{
    track:Track;
}

interface PlaylistItem {
    playlist: Playlist;
}
