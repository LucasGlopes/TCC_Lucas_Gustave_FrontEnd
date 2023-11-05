export interface SexNumbers {
    mulheres: number;
    homens: number;
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