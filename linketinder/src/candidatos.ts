export class Candidato {
    nome: string;
    email: string;
    cpf: string;
    formacao: string;
    estado: string;
    cep: string;
    skills: string[];
    descricao: string;
    senha: string;

    constructor(
        nome: string,
        email: string,
        cpf: string,
        formacao: string,
        estado: string,
        cep: string,
        skills: string[],
        descricao: string,
        senha: string
    ) {
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.formacao = formacao;
        this.estado = estado;
        this.cep = cep;
        this.skills = skills;
        this.descricao = descricao;
        this.senha = senha;
    }
}
