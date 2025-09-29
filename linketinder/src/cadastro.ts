// logica de cadastro e localStorage

import { Candidato } from "./candidatos";
import { Empresa } from "./empresa";
import { salvarCandidato, salvarEmpresa } from "./storage";
import { skillsToArray } from "./utils";

const btnCandidato = document.getElementById("btn-candidato") as HTMLButtonElement;
const btnEmpresa = document.getElementById("btn-empresa") as HTMLButtonElement;
const formCandidato = document.getElementById("form-candidato") as HTMLFormElement;
const formEmpresa = document.getElementById("form-empresa") as HTMLFormElement;

// Configurar eventos de clique para alternar entre formulários
btnCandidato.addEventListener("click", () => {
    formCandidato.style.display = "grid";
    formEmpresa.style.display = "none";

    btnCandidato.classList.add("active");
    btnEmpresa.classList.remove("active");
});

btnEmpresa.addEventListener("click", () => {
    formCandidato.style.display = "none";
    formEmpresa.style.display = "grid";

    btnEmpresa.classList.add("active");
    btnCandidato.classList.remove("active");
});

// Evento de submissão para o formulário de candidato
formCandidato.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão de submissão do formulário

    // Criar objeto candidato com os valores dos campos
    const candidato = new Candidato(
        (document.getElementById("cand-nome") as HTMLInputElement).value,
        (document.getElementById("cand-email") as HTMLInputElement).value,
        (document.getElementById("cand-cpf") as HTMLInputElement).value,
        (document.getElementById("cand-formacao") as HTMLInputElement).value,
        (document.getElementById("cand-estado") as HTMLInputElement).value,
        (document.getElementById("cand-cep") as HTMLInputElement).value,
        skillsToArray((document.getElementById("cand-skills") as HTMLInputElement).value),
        (document.getElementById("cand-descricao") as HTMLTextAreaElement).value
    );

    // Salvar candidato no localStorage
    salvarCandidato(candidato);
    
    // Redirecionar para a página de perfil do candidato
    window.location.href = "perfil-candidato.html";
});

// Evento de submissão para o formulário de empresa
formEmpresa.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede o comportamento padrão de submissão do formulário

    // Criar objeto empresa com os valores dos campos
    const empresa = new Empresa(
        (document.getElementById("emp-nome") as HTMLInputElement).value,
        (document.getElementById("emp-email") as HTMLInputElement).value,
        (document.getElementById("emp-cnpj") as HTMLInputElement).value,
        (document.getElementById("emp-pais") as HTMLInputElement).value,
        (document.getElementById("emp-estado") as HTMLInputElement).value,
        (document.getElementById("emp-cep") as HTMLInputElement).value,
        skillsToArray((document.getElementById("emp-skills") as HTMLInputElement).value),
        (document.getElementById("emp-descricao") as HTMLTextAreaElement).value,
        [] // Array vazio para vagas
    );

    // Salvar empresa no localStorage
    salvarEmpresa(empresa);
    
    // Redirecionar para a página de perfil da empresa
    window.location.href = "perfil-empresa.html";
});
