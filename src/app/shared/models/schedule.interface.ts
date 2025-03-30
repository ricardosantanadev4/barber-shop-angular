import { IClient } from "./client.interface";

export interface ISchedule {
    id: number;
    inicio: string;
    fim: string;
    cliente: IClient;
}
