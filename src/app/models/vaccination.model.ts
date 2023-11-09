import { CurrentUser } from "./user.model";
export interface Campaign {
    nomeCampanha: string;
    dataCampanha: string;
    descricao: string;
    nomeVacina: string;
    idCampanha: number;
}

export enum Status {
    pendente = 'PENDENTE',
    concluido = 'CONCLUIDO',
    atrasado = 'ATRASADO',
    cancelado = 'CANCELADO'
}

export interface Vaccination {
    idVacinacao: number;
    campanha: Campaign;
    pessoa: CurrentUser;
    status: Status;
}