export interface Album {
    album_type: string;
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    type: string;
    release_date: string;
    release_date_precision: string;
    restrictions: Restrictions;
    uri: string;
}

export interface Artist {
    external_urls: ExternalUrls;
    followers: Followers;
    genres: string[];
    href: string;
    id: string;
    images: Image[];
    name: string;
    popularity: number;
    type: string;
    uri: string;
}

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    restrictions: Restrictions;
    name: string;
    popularity: number;
    preview_url: string;//30s audio preview url
    track_number: number;
    type: string;
    uri: string;
    isLocal: boolean; // true if its from a local file
}

export interface Playlist{
    collaborative: boolean;
    description: string|null;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: Owner;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Tracks{
    href: string;
    total: number;
}

export interface Owner{
    display_name: string;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface ExternalUrls{
    spotify: string;
}

export interface ExternalIds{
    isrc: string;
}

export interface Restrictions{
    reason: string;
}

export interface ExternalIds {
    isrc: string; //International Standard Recording Code
    ean: string; //European Article Number
    upc: string; //Universal Product Code

}

export interface ExternalUrls {
    spotify: string;
}

export interface Image {
    height: number;
    url: string;
    width: number;
}
export interface Restrictions {
    reason: string;
}

export interface Followers {
    href: string; // null as API is not supporting it atm
    total: number;
}

    


