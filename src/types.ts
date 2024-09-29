export interface IDataResponse {
    pag_html: string
    table_html: string
}

export type IData = {
    date: string;
    data: {
        number: string;
        name: string;
        date: string;
    }[];
}[];

export interface IJSONData {
    data: IData
    lastUpdatedTimestamp: null | number
}