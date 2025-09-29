import { getCandidatoAtual, getEmpresaAtual, getCandidatos, atualizarEmpresa, getAllVagas } from "./storage";
import {  gerarDadosGraficoSkills, skillsToArray } from "./utils";
import type { Vaga } from "./empresa";

// Verificar em qual página estamos
const isPaginaCandidato = window.location.href.includes('perfil-candidato.html');
const isPaginaEmpresa = window.location.href.includes('perfil-empresa.html');

// Função para inicializar a página do candidato
export function inicializarPerfilCandidato() {
    const candidatoAtual = getCandidatoAtual();
    
    if (!candidatoAtual) {
        alert("Nenhum candidato logado!");
        window.location.href = "index.html";
        return;
    }
    
    // Mostrar mensagem de boas-vindas
    const boasVindasElement = document.getElementById('boas-vindas-candidato');
    if (boasVindasElement) {
        boasVindasElement.textContent = `Bem-vindo(a), ${candidatoAtual.nome}!`;
    }
    
    // Exibir vagas disponíveis
    exibirVagasDisponiveis();
}

// Função para exibir vagas disponíveis na página do candidato
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
    
    // Adicionar evento aos botões de candidatura (funcionalidade futura)
    document.querySelectorAll('.btn-candidatar').forEach(button => {
        button.addEventListener('click', () => {
            alert('Candidatura enviada com sucesso!');
        });
    });
}

// Função para inicializar a página da empresa
export function inicializarPerfilEmpresa() {
    const empresaAtual = getEmpresaAtual();
    
    if (!empresaAtual) {
        alert("Nenhuma empresa logada!");
        window.location.href = "index.html";
        return;
    }
    
    // Mostrar mensagem de boas-vindas
    const boasVindasElement = document.getElementById('boas-vindas-empresa');
    if (boasVindasElement) {
        boasVindasElement.textContent = `Bem-vindo(a), ${empresaAtual.nome}!`;
    }
    
    // Configurar o modal de criar vaga
    configurarModalCriarVaga();
    
    // Exibir candidatos cadastrados
    exibirCandidatosCadastrados();
    
    // Gerar gráficos
    gerarGraficos();
}

// Função para configurar o modal de criação de vagas
function configurarModalCriarVaga() {
    const btnCriarVaga = document.getElementById('btn-criar-vaga');
    const modalCriarVaga = document.getElementById('modal-criar-vaga');
    const btnFecharModal = document.getElementById('fechar-modal');
    const btnSalvarVaga = document.getElementById('salvar-vaga');
    
    if (!btnCriarVaga || !modalCriarVaga || !btnFecharModal || !btnSalvarVaga) {
        console.error('Elementos do modal não encontrados.');
        return;
    }
    
    // Evento para abrir o modal
    btnCriarVaga.addEventListener('click', () => {
        if (modalCriarVaga) {
            modalCriarVaga.style.display = 'block';
        }
    });
    
    // Evento para fechar o modal
    btnFecharModal.addEventListener('click', () => {
        if (modalCriarVaga) {
            modalCriarVaga.style.display = 'none';
        }
    });
    
    // Evento para salvar a vaga
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
        
        // Criar a vaga
        criarVaga(titulo, skillsToArray(skillsString));
        
        // Limpar o formulário
        tituloVagaInput.value = '';
        skillsVagaInput.value = '';
        
        // Fechar o modal
        modalCriarVaga.style.display = 'none';
    });
}

// Função para criar uma nova vaga
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

// Função para exibir candidatos cadastrados na página da empresa
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

// Função para gerar gráficos na página da empresa
function gerarGraficos() {
    const graficoContainer = document.getElementById('grafico-candidatos');
    if (!graficoContainer) return;

    const candidatos = getCandidatos();

    if (candidatos.length === 0) {
        graficoContainer.innerHTML = '<p>Não há dados suficientes para gerar gráficos.</p>';
        return;
    }

    // Remover esta linha se quiser limpar:
    // const dadosFormacao = gerarDadosGraficoFormacao(candidatos);

    const dadosSkills = gerarDadosGraficoSkills(candidatos);

    // Gerar apenas o gráfico de skills
    graficoContainer.innerHTML = `
        <div class="grafico-section">
            <h4>Top 10 Skills</h4>
            <div class="grafico-barras skills">
                ${gerarHTML_GraficoBarras(dadosSkills.labels, dadosSkills.data)}
            </div>
        </div>
    `;
}


// Função para gerar HTML de um gráfico de barras simples
function gerarHTML_GraficoBarras(labels: string[], data: number[]): string {
    // Encontrar o valor máximo para calcular as proporções das barras
    const maxValue = Math.max(...data);
    
    // Gerar HTML para cada barra
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
