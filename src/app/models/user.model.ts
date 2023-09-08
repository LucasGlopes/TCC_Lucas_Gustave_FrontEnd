export interface User {
    cpf: string;
    dateOfBirth: string;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    sex: string;
    phone: string;
}

export interface CurrentUser {
    firstName: string;
    lastName: string;
    email: string;
    id: number;
}
