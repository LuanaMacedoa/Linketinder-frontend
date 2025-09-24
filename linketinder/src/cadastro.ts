// logica de cadastro e localStorage

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

formCandidato.addEventListener("submit", (e) =>{
    e.preventDefault();
    window.location.href = "perfil-candidato.html";
});

formEmpresa.addEventListener("submit", (e)=>{
    e.preventDefault();
    window.location.href = "perfil-empresa.html";
});