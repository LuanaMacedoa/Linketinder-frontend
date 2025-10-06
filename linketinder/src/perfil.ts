import { getCandidatoAtual, getEmpresaAtual, getCandidatos, atualizarEmpresa, getAllVagas } from "./storage";
import {  gerarDadosGraficoSkills, skillsToArray } from "./utils";
import type { Vaga } from "./empresa";

const isPaginaCandidato = window.location.href.includes('perfil-candidato.html');
const isPaginaEmpresa = window.location.href.includes('perfil-empresa.html');

export function inicializarPerfilCandidato() {
    const candidatoAtual = getCandidatoAtual();
    
    if (!candidatoAtual) {
        alert("Nenhum candidato logado!");
        window.location.href = "index.html";
        return;
    }
    
    const boasVindasElement = document.getElementById('boas-vindas-candidato');
    if (boasVindasElement) {
        boasVindasElement.textContent = `Bem-vindo(a), ${candidatoAtual.nome}!`;
    }
    
    exibirVagasDisponiveis();
}

function exibirVagasDisponiveis() {
    const listaVagas = document.getElementById('lista-vagas');
    if (!listaVagas) return;
    
    const vagas = getAllVagas();
    
    if (vagas.length === 0) {
        listaVagas.innerHTML = '<li>Nenhuma vaga disponível no momento.</li>';
        return;
    }
    
    listaVagas.innerHTML = vagas.map(vaga => `
        <li>
            <h4>${vaga.titulo}</h4>
            <p>Skills desejadas: ${vaga.skills.join(', ')}</p>
            <button class="btn-candidatar">Candidatar-se</button>
        </li>
    `).join('');
    
    document.querySelectorAll('.btn-candidatar').forEach(button => {
        button.addEventListener('click', () => {
            alert('Candidatura enviada com sucesso!');
        });
    });
}

export function inicializarPerfilEmpresa() {
    const empresaAtual = getEmpresaAtual();
    
    if (!empresaAtual) {
        alert("Nenhuma empresa logada!");
        window.location.href = "index.html";
        return;
    }
    
    const boasVindasElement = document.getElementById('boas-vindas-empresa');
    if (boasVindasElement) {
        boasVindasElement.textContent = `Bem-vindo(a), ${empresaAtual.nome}!`;
    }
    
    configurarModalCriarVaga();
    
    exibirCandidatosCadastrados();
    
    gerarGraficos();
}


function configurarModalCriarVaga() {
    const btnCriarVaga = document.getElementById('btn-criar-vaga');
    const modalCriarVaga = document.getElementById('modal-criar-vaga');
    const btnFecharModal = document.getElementById('fechar-modal');
    const btnSalvarVaga = document.getElementById('salvar-vaga');
    
    if (!btnCriarVaga || !modalCriarVaga || !btnFecharModal || !btnSalvarVaga) {
        console.error('Elementos do modal não encontrados.');
        return;
    }
    
    btnCriarVaga.addEventListener('click', () => {
        if (modalCriarVaga) {
            modalCriarVaga.style.display = 'block';
        }
    });
    
    
    btnFecharModal.addEventListener('click', () => {
        if (modalCriarVaga) {
            modalCriarVaga.style.display = 'none';
        }
    });
    
    btnSalvarVaga.addEventListener('click', () => {
        const tituloVagaInput = document.getElementById('titulo-vaga') as HTMLInputElement;
        const skillsVagaInput = document.getElementById('skills-vaga') as HTMLInputElement;
        
        if (!tituloVagaInput || !skillsVagaInput) {
            alert('Formulário inválido!');
            return;
        }
        
        const titulo = tituloVagaInput.value.trim();
        const skillsString = skillsVagaInput.value.trim();
        
        if (!titulo || !skillsString) {
            alert('Preencha todos os campos!');
            return;
        }
        
        criarVaga(titulo, skillsToArray(skillsString));
        
        tituloVagaInput.value = '';
        skillsVagaInput.value = '';
        
        modalCriarVaga.style.display = 'none';
    });
}

function criarVaga(titulo: string, skills: string[]) {
    const empresaAtual = getEmpresaAtual();
    
    if (!empresaAtual) {
        alert('Erro: Nenhuma empresa logada.');
        return;
    }
    
    if (!empresaAtual.vagas) {
        empresaAtual.vagas = [];
    }

    empresaAtual.vagas.push({ titulo, skills });
    
    atualizarEmpresa(empresaAtual);
    
    alert('Vaga criada com sucesso!');
}

function exibirCandidatosCadastrados() {
    const listaCandidatos = document.getElementById('lista-candidatos');
    if (!listaCandidatos) return;
    
    const candidatos = getCandidatos();
    
    if (candidatos.length === 0) {
        listaCandidatos.innerHTML = '<li>Nenhum candidato cadastrado.</li>';
        return;
    }
    
    listaCandidatos.innerHTML = candidatos.map(candidato => `
        <li>
            <p>Formação: ${candidato.formacao}</p>
            <p>Skills: ${candidato.skills.join(', ')}</p>
        </li>
    `).join('');
}

function gerarGraficos() {
    const graficoContainer = document.getElementById('grafico-candidatos');
    if (!graficoContainer) return;

    const candidatos = getCandidatos();

    if (candidatos.length === 0) {
        graficoContainer.innerHTML = '<p>Não há dados suficientes para gerar gráficos.</p>';
        return;
    }

    const dadosSkills = gerarDadosGraficoSkills(candidatos);

    graficoContainer.innerHTML = `
        <div class="grafico-section">
            <h4>Top 10 Skills</h4>
            <div class="grafico-barras skills">
                ${gerarHTML_GraficoBarras(dadosSkills.labels, dadosSkills.data)}
            </div>
        </div>
    `;
}


function gerarHTML_GraficoBarras(labels: string[], data: number[]): string {
    const maxValue = Math.max(...data);

    return labels.map((label, index) => {
        const valor = data[index];
        const porcentagem = maxValue ? (valor / maxValue) * 100 : 0;
        
        return `
            <div class="barra-container">
                <div class="barra-label">${label}</div>
                <div class="barra" style="width: ${porcentagem}%;">
                    <span class="barra-valor">${valor}</span>
                </div>
            </div>
        `;
    }).join('');
}
