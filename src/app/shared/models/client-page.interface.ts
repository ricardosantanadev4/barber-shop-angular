import { IClient } from "./client.interface";

export interface IClientPage {
    content: IClient[];
    pageable: {
        pageNumber: number,
        pageSize: number,
        sort: {
            empty: boolean,
            unsorted: boolean,
            sorted: boolean
        },
        offset: number,
        unpaged: boolean,
        paged: boolean
    },
    last: boolean,
    totalElements: number,
    totalPages: number,
    first: boolean,
    size: number,
    number: number,
    sort: {
        empty: boolean,
        unsorted: boolean,
        sorted: boolean
    },
    numberOfElements: number,
    empty: boolean
}