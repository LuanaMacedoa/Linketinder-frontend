// logica de cadastro e localStorage

import { Candidato } from "./candidatos";
import { Empresa } from "./empresa";
import { salvarCandidato, salvarEmpresa } from "./storage";
import { skillsToArray } from "./utils";

const btnCandidato = document.getElementById("btn-candidato") as HTMLButtonElement;
const bntEmpresa = document.getElementById("btn-empresa") as HTMLButtonElement;
const formCandidato = document.getElementById("form-candidato") as HTMLFormElement;
const formEmpresa = document.getElementById("form-empresa") as HTMLFormElement;

btnCandidato.addEventListener("click",()=>{
    formCandidato.style.display = "grid";
    formEmpresa.style.display = "none";

    btnCandidato.classList.add("acitve");
    bntEmpresa.classList.remove("active");
});

bntEmpresa.addEventListener("click",()=>{
    formCandidato.style.display = "none";
    formEmpresa.style.display = "grid";

    bntEmpresa.classList.add("active");
    btnCandidato.classList.remove("active");
});

formCandidato.addEventListener("submit", (e) => {
    e.preventDefault();

    const candidato = new Candidato(
    (document.getElementById("cand-nome") as HTMLInputElement).value,
    (document.getElementById("cand-email") as HTMLInputElement).value,
    (document.getElementById("cand-cpf") as HTMLInputElement).value,
    (document.getElementById("cand-formacao") as HTMLInputElement).value,
    (document.getElementById("cand-estado") as HTMLInputElement).value,
    (document.getElementById("cand-cep") as HTMLInputElement).value,
    skillsToArray((document.getElementById("cand-skills") as HTMLInputElement).value),
    (document.getElementById("cand-descricao") as HTMLTextAreaElement).value,
    
    );

    salvarCandidato(candidato);
    window.location.href = "perfil-candidato.html"


});


formEmpresa.addEventListener("submit", (e) =>{
    e.preventDefault();

    const empresa = new Empresa(
        (document.getElementById("emp-nome") as HTMLInputElement).value,
        (document.getElementById("emp-email") as HTMLInputElement).value,
        (document.getElementById("emp-cnpj") as HTMLInputElement).value,
        (document.getElementById("emp-pais") as HTMLInputElement).value,
        (document.getElementById("emp-estado") as HTMLInputElement).value,
        (document.getElementById("emp-cep") as HTMLInputElement).value,
        skillsToArray((document.getElementById("emp-skills") as HTMLInputElement).value),
        (document.getElementById("emp-descricao") as HTMLInputElement).value,
        []
    );

    salvarEmpresa(empresa);
    window.location.href = "perfil-empresa.html"
});
