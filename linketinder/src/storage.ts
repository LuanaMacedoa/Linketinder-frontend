// funcoes para amnipular localstorage
import { Candidato } from "./candidatos";
import { Empresa } from "./empresa";



export function salvarCandidato(candidato: Candidato){
    const candidatos = JSON.parse(localStorage.getItem('candidatos') || '[]');
    candidatos.push(candidato);
    localStorage.setItem("candidatos", JSON.stringify(candidatos))
}

export function carregarCandidatos(): []{
    return JSON.parse(localStorage.getItem("candidatos") || "[]");

}

export function salvarEmpresa(empresa: Empresa){
    const empresas = JSON.parse(localStorage.getItem("empresas") || "[]");

    const index = empresas.findIndex((e: Empresa) => e.email === empresa.email);
    if (index >= 0) empresas[index] = empresa;
    else empresas.push(empresa)

    localStorage.setItem("empresas",JSON.stringify(empresas));
}

export function carregarEmpresas(): Empresa[]{
    return JSON.parse(localStorage.getItem("empresas") || "[]")
}

