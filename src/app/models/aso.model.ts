import { MatTableDataSource } from "@angular/material/table";
import { Exam } from "./exam.model";
import { CurrentUser } from "./user.model";

export enum AsoType {
    admissional = 'ADMISSIONAL',
    periodico = 'PERIODICO',
    retorno = 'RETORNO',
    mudanca = 'MUDANCA', 
    demissional = 'DEMISSIONAL' 
}

export enum AsoResult {
    apto = 'APTO',
    inapto = 'INAPTO'
}

export interface AsoRequest {
    cnpj: string;
    crmMedicoPCMSO: string;
    crmMedicoClinico: string;
    dataASO: string;
    exames: number[];
    idASO: number;
    idPessoa: number;
    nomeEmpresa: string;
    nomeMedicoClinico: string;
    nomeMedicoPCMSO: string;
    resultadoASO: AsoResult;
    risco: string[];
    tipoASO: AsoType;
    validade: string;
    exameClinico?: number;
    examesComplementares?: number[];

}

export interface Aso {
    cnpj: string;
    crmMedicoPCMSO: string;
    crmMedicoClinico: string;
    dataASO: string;
    exames: Exam[];
    idASO: number;
    pessoa: CurrentUser;
    nomeEmpresa: string;
    nomeMedicoClinico: string;
    nomeMedicoPCMSO: string;
    resultadoASO: AsoResult;
    risco: string[];
    tipoASO: AsoType;
    validade: string;
}

export interface AsosByType {
    type: AsoType;
    title: string;
    asos: Aso[];
    dataSource: MatTableDataSource<Aso> | undefined;
}