export class Candidato {
    nome: string;
    email: string;
    linkedin: string;
    telefone: string;
    cpf: string;
    formacao: string;
    estado: string;
    cep: string;
    skills: string[];
    descricao: string;

    constructor(
        nome: string,
        email: string,
        linkedin: string,
        telefone: string,
        cpf: string,
        formacao: string,
        estado: string,
        cep: string,
        skills: string[],
        descricao: string,

    ) {
        this.nome = nome;
        this.email = email;
        this.linkedin = linkedin;
        this.telefone = telefone;
        this.cpf = cpf;
        this.formacao = formacao;
        this.estado = estado;
        this.cep = cep;
        this.skills = skills;
        this.descricao = descricao;
        
    }
}
