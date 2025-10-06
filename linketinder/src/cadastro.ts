import { Candidato } from "./candidatos";
import { Empresa } from "./empresa";
import { salvarCandidato, salvarEmpresa } from "./storage";
import { skillsToArray } from "./utils";

const btnCandidato = document.getElementById("btn-candidato") as HTMLButtonElement;
const btnEmpresa = document.getElementById("btn-empresa") as HTMLButtonElement;
const formCandidato = document.getElementById("form-candidato") as HTMLFormElement;
const formEmpresa = document.getElementById("form-empresa") as HTMLFormElement;

const nomeRegex = /^[A-Za-zÀ-ú]+(?:\s+[A-Za-zÀ-ú]+)+$/;
const emailRegex = /^[\w.-]+@[A-Za-z.-]+\.[A-Za-z]{2,}$/;
const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
const telefoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:9?\d{4})-?\d{4}$/;
const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|company)\/[A-Za-z0-9_-]+\/?$/;
const tagsRegex = /^[A-Za-zÀ-ú]+(?:,\s*[A-Za-zÀ-ú]+)*$/;
const cnpjRegex = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const cepRegex = /^\d{5}-?\d{3}$/;
const tagsRegexEmp = /^(?!\s*$)[a-zA-ZÀ-ÿ\s,]+$/;


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


formCandidato.addEventListener("submit", (e) => {
    e.preventDefault(); 


    const nomeCandInput = document.getElementById("cand-nome") as HTMLInputElement;
    const emailCandInput = document.getElementById("cand-email") as HTMLInputElement;
    const linkedinCandInput = document.getElementById("cand-linkedin") as HTMLInputElement;
    const telefoneCandInput = document.getElementById("cand-telefone") as HTMLInputElement;
    const cpfCandInput = document.getElementById("cand-cpf") as HTMLInputElement;
    const formacaoCandInput = document.getElementById("cand-formacao") as HTMLInputElement;
    const estadoCandInput = document.getElementById("cand-estado") as HTMLInputElement;
    const cepCandInput = document.getElementById("cand-cep") as HTMLInputElement;
    const skillsCandInput = document.getElementById("cand-skills") as HTMLInputElement; 
    const descricaoCandInput = document.getElementById("cand-descricao") as HTMLTextAreaElement;

    const nomeCand = nomeCandInput.value.trim();
    const emailCand = emailCandInput.value.trim();
    const linkedinCand = linkedinCandInput.value.trim();
    const telefoneCand = telefoneCandInput.value.trim();
    const cpfCand = cpfCandInput.value.trim();
    const formacaoCand = formacaoCandInput.value.trim();
    const estadoCand = estadoCandInput.value.trim();
    const cepCand = cepCandInput.value.trim();
    const skillsCand = skillsCandInput.value.trim();
    const descricaoCand = descricaoCandInput.value.trim();

    if (!nomeRegex.test(nomeCand)) return alert("Nome inválido. Deve conter pelo menos um nome e um sobrenome, apenas letras e espaços.");
    if (!emailRegex.test(emailCand)) return alert("Email inválido.");
    if (!linkedinRegex.test(linkedinCand)) return alert("Link do LinkedIn inválido. Deve ser uma URL válida do LinkedIn.");
    if (!telefoneRegex.test(telefoneCand)) return alert("Telefone inválido. Deve conter 10 ou 11 dígitos, com ou sem DDD, com ou sem código do país.");
    if (!cpfRegex.test(cpfCand)) return alert("CPF inválido. Deve conter 11 dígitos, com ou sem formatação.");
    if (!skillsCand) return alert("Skills não podem estar vazias.");
    if (!tagsRegex.test(skillsCand)) return alert("Skills inválidas. Devem ser palavras separadas por vírgulas.");


    const candidato = new Candidato(
        nomeCand,
        emailCand,
        linkedinCand,
        telefoneCand,
        cpfCand,
        formacaoCand,
        estadoCand,
        cepCand,
        skillsToArray(skillsCand),
        descricaoCand
    );


    
    salvarCandidato(candidato);
    window.location.href = "perfil-candidato.html";
});


formEmpresa.addEventListener("submit", (e) => {
    e.preventDefault(); 


    const nomeEmpInput = document.getElementById("emp-nome") as HTMLInputElement;
    const emailEmpInput = document.getElementById("emp-email") as HTMLInputElement;
    const cnpjEmpInput = document.getElementById("emp-cnpj") as HTMLInputElement;
    const paisEmpInput = document.getElementById("emp-pais") as HTMLInputElement;
    const estadoEmpInput = document.getElementById("emp-estado") as HTMLInputElement;
    const cepEmpInput = document.getElementById("emp-cep") as HTMLInputElement;
    const skillsEmpInput = document.getElementById("emp-skills") as HTMLInputElement; 
    const descricaoEmpInput = document.getElementById("emp-descricao") as HTMLTextAreaElement;

    const nomeEmp = nomeEmpInput.value.trim();
    const emailEmp = emailEmpInput.value.trim();
    const cnpjEmp = cnpjEmpInput.value.trim();
    const paisEmp = paisEmpInput.value.trim();
    const estadoEmp = estadoEmpInput.value.trim();
    const cepEmp = cepEmpInput.value.trim();
    const skillsEmp = skillsEmpInput.value.trim();
    const descricaoEmp = descricaoEmpInput.value.trim();

    if (!nomeRegex.test(nomeEmp)) return alert("Nome inválido! Insira o nome completo da empresa.");
    if (!emailRegex.test(emailEmp)) return alert("Email inválido.");
    if (!cnpjRegex.test(cnpjEmp)) return alert("CNPJ inválido. Deve conter 14 dígitos, com ou sem formatação.");
    if (!cepRegex.test(cepEmp)) return alert("CEP inválido. Deve conter 8 dígitos, com ou sem formatação.");
    if (!skillsEmp) return alert("As skills não podem estar vazias.");
    if (!tagsRegexEmp.test(skillsEmp)) return alert("Use apenas letras, vírgulas e espaços nas tags.");

    
    const empresa = new Empresa(
        nomeEmp,
        emailEmp,
        cnpjEmp,
        paisEmp,
        estadoEmp,
        cepEmp,
        skillsToArray(skillsEmp),
        descricaoEmp,
        []
    );

    salvarEmpresa(empresa);
    
    window.location.href = "perfil-empresa.html";
});
