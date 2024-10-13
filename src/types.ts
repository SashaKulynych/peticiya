export interface IDataResponse {
    pag_html: string
    table_html: string
}

export type IData = {
    dateTimestamp: number
    date: string;
    isFinished?: boolean
    total: number
}[];

export interface IJSONData {
    data: IData
    lastUpdatedTimestamp: null | number
}