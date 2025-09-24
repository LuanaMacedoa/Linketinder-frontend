// funcoes axuiliares (gerar ID, validação, etc)
import { Candidato } from "./candidatos";
import { Empresa } from "./empresa";


export function loginCandidato(email: string): Candidato | undefined{
    const candidatos: Candidato[] = JSON.parse(localStorage.getItem("candidatos") || "[]");
    return candidatos.find(c => c.email === email);
}

export function loginEmpresa(email: string): Empresa | undefined{
    const empresas: Empresa[] = JSON.parse(localStorage.getItem("empresas") || "[]");
    return empresas.find(e => e.email == email);
    
}

export function skillsToArray(skills: string): string[]{
    return skills.split(",").map(s=>s.trim()).filter(s=> s !== "");
}