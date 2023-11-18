import { ExamType } from "./exam.model";
import { Status } from "./vaccination.model";

export interface SexNumbers {
    mulheres: number;
    homens: number;
    outros: number;
}

export interface QuantityBySex {
    dados: SexNumbers;
    porcentagem: SexNumbers;
}

export interface QuantityBySector {
    setor: string;
    quantidade: number;
    porcentagem: number;
}

export interface AptitudeNumbers {
    apto: number;
    inapto: number;
}

export interface QuantityByAptitude {
    dados: AptitudeNumbers;
    porcentagem: AptitudeNumbers;
}

export interface QuantityByCampaign {
    quantidadeVacinacoes: number;
    campanha: string;
    quantidadeVacinados: number;
}

export interface ExamByMonth {
    tipoExame: ExamType;
    mes: number;
    quantidade: number;
}

export interface CampaignStatusQuantity {
    status: Status;
    quantidade: number;
    porcentagem: number;
}