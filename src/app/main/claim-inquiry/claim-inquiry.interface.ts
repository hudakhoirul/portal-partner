export interface ClaimInquiryInterface {
    acknowledge: boolean;
    data: ClaimInquiryDataInterface[];
    total: number;
}

export interface ClaimInquiryDataInterface {
    id: number;
    routeCode: string;
}

export interface Itunes {
    wrapperType: string;
    kind: string;
    artistId: string;
    collectionId: string;
    trackId: string;
    artistName: string;
    collectionName: string;
    trackName: string;
}

export interface Response {
    resultCount: number;
    results: Array<Itunes>;
}
