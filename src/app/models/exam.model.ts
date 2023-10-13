import { CurrentUser } from "./user.model";


export enum ExamStatus {
    pendente = 'PENDENTE',
    concluido = 'CONCLUIDO',
    expirado = 'EXPIRADO',
    cancelado = 'CANCELADO'
}

export interface Exam {
    idExame: number;
    dataExame: string;
    horaExame: string;
    localExame: string;
    nomeExame: string;
    pessoa: CurrentUser;
    statusExame: ExamStatus;
}