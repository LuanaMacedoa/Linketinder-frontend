// lógica de perfil (candidato e empresa)

import { carregarCandidatos, carregarEmpresas, salvarEmpresa } from "./storage";
import { skillsToArray } from "./utils";
import { Empresa } from "./empresa";
import { Candidato } from "./candidatos";
import { Chart } from "chart.js";

/* ================= PERFIL CANDIDATO ================= */
const boasVindasCandidato = document.getElementById("boas-vindas-candidato") as HTMLHeadingElement;
const listaVagas = document.getElementById("lista-vagas") as HTMLUListElement;

const candidatos: Candidato[] = carregarCandidatos();
const empresas: Empresa[] = carregarEmpresas();

if (candidatos.length > 0) {
    boasVindasCandidato.innerText = `Bem-vindo(a), ${candidatos[0].nome}!`;
}

/* Exibe todas as vagas de todas as empresas */
empresas.forEach(emp => {
    emp.vagas.forEach(vaga => {
        const li = document.createElement("li");
        li.textContent = `${vaga.titulo} - Skills: ${vaga.skills.join(", ")}`;
        listaVagas.appendChild(li);
    });
});

/* ================= PERFIL EMPRESA ================= */
const boasVindasEmpresa = document.getElementById("boas-vindas-empresa") as HTMLHeadingElement;
const listaCandidatos = document.getElementById("lista-candidatos") as HTMLUListElement;
const graficoContainer = document.getElementById("grafico-candidatos") as HTMLDivElement;

if (empresas.length > 0) {
    boasVindasEmpresa.innerText = `Bem-vindo(a), ${empresas[0].nome}!`;
}

/* Lista de candidatos anônimos */
candidatos.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `Formação: ${c.formacao} <br> Skills: ${c.skills.join(", ")}`;
    listaCandidatos.appendChild(li);
});

/* Gráfico de skills */
const skillsMap: { [key: string]: number } = {};
candidatos.forEach(c => {
    c.skills.forEach(skill => {
        if (skillsMap[skill]) skillsMap[skill]++;
        else skillsMap[skill] = 1;
    });
});

const ctx = document.createElement("canvas");
graficoContainer.appendChild(ctx);

new Chart(ctx, {
    type: 'bar',
    data: {
        labels: Object.keys(skillsMap),
        datasets: [{
            label: 'Número de candidatos por skill',
            data: Object.values(skillsMap),
            backgroundColor: '#412154'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});

/* ================= CRIAR VAGA ================= */
const btnCriarVaga = document.getElementById("btn-criar-vaga") as HTMLButtonElement;
const modalCriarVaga = document.getElementById("modal-criar-vaga") as HTMLDivElement;
const btnSalvarVaga = document.getElementById("salvar-vaga") as HTMLButtonElement;
const btnFecharModal = document.getElementById("fechar-modal") as HTMLButtonElement;

if (btnCriarVaga && modalCriarVaga) {
    btnCriarVaga.addEventListener("click", () => {
        modalCriarVaga.style.display = "block";
    });

    btnFecharModal.addEventListener("click", () => {
        modalCriarVaga.style.display = "none";
    });

    btnSalvarVaga.addEventListener("click", () => {
        const titulo = (document.getElementById("titulo-vaga") as HTMLInputElement).value;
        const skills = skillsToArray((document.getElementById("skills-vaga") as HTMLInputElement).value);

        const empresas = carregarEmpresas();
        if (empresas.length > 0) {
            empresas[0].criarVaga(titulo, skills);
            salvarEmpresa(empresas[0]);

            // Atualiza lista de vagas
            const li = document.createElement("li");
            li.textContent = `${titulo} - Skills: ${skills.join(", ")}`;
            listaVagas.appendChild(li);
        }

        modalCriarVaga.style.display = "none";
    });
}
