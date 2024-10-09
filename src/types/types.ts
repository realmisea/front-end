export interface NeedItem {
    image: string;
    message: string;
}

export interface NeedDataType {
    states: {
        [key: string]: NeedItem;
    };
}
