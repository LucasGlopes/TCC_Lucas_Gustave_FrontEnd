export enum Perfis {
    admin = 'ADMIN',
    funcionario = 'FUNCIONARIO',
    tecnico = 'TECNICO'
}

export enum Sexo {
    masculino = 'MASCULINO',
    feminino = 'FEMININO'
}

export interface User {
    id: number;
    cpf: string;
    dataAniversario: string;
    email: string;
    primeiroNome: string;
    ultimoNome: string;
    senha: string;
    sexoEnum: Sexo;
    telefone: string;
    confirmaSenha?: string;
    tipoUsuario?: Perfis;
    setor: string;
    cargo: string;
    perfis?: Perfis[];
}

export interface CurrentUser {
    primeiroNome: string;
    ultimoNome: string;
    email: string;
    id: number;
    dataAniversario: string;
    perfis: Perfis[];
    telefone: string;
    isApproved: boolean;
    sexoEnum: Sexo;
    cpf: string;
    setor: string;
    cargo: string;
}
