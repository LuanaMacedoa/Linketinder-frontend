export interface Vaga{
    titulo: string;
    skills: string[];
}

export class Empresa {
    nome: string;
    email: string;
    cnpj: string;
    pais: string;
    estado: string;
    cep: string;
    skillsProcuradas: string[];
    descricao: string;
    vagas: Vaga[];

    constructor(
        nome: string,
        email: string,
        cnpj: string,
        pais: string,
        estado: string,
        cep: string,
        skillsProcuradas: string[],
        descricao: string,
        vagas: Vaga[],
    ) {
        this.nome = nome;
        this.email = email;
        this.cnpj = cnpj;
        this.pais = pais;
        this.estado = estado;
        this.cep = cep;
        this.skillsProcuradas = skillsProcuradas;
        this.descricao = descricao;
        this.vagas = vagas;

    }

    criarVaga(titulo: string, skills: string[]) {
    this.vagas.push({ titulo, skills });
    }

}

