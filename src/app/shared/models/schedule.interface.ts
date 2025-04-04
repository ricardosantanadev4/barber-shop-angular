import { IClient } from "./client.interface";

export interface ISchedule {
    id: number;
    inicio: string;
    fim: string;
    data: Date;
    cliente: IClient;
}
