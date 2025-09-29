import { Candidato } from "./candidatos";
import type { Empresa} from "./empresa";
import type { Vaga } from "./empresa";

// Chaves para localStorage
const CANDIDATOS_KEY = 'linketinder_candidatos';
const EMPRESAS_KEY = 'linketinder_empresas';
const USUARIO_ATUAL_KEY = 'linketinder_usuario_atual';
const VAGAS_KEY = 'linketinder_vagas';

// Funções para salvar e recuperar candidatos
export function salvarCandidato(candidato: Candidato): void {
    const candidatosAtuais = getCandidatos();
    candidatosAtuais.push(candidato);
    localStorage.setItem(CANDIDATOS_KEY, JSON.stringify(candidatosAtuais));
    
    // Salvar email do usuário atual para identificação
    salvarUsuarioAtual({
        tipo: 'candidato',
        email: candidato.email
    });
}

export function getCandidatos(): Candidato[] {
    const candidatosString = localStorage.getItem(CANDIDATOS_KEY);
    return candidatosString ? JSON.parse(candidatosString) : [];
}

export function getCandidatoAtual(): Candidato | null {
    const usuario = getUsuarioAtual();
    if (usuario && usuario.tipo === 'candidato') {
        const candidatos = getCandidatos();
        return candidatos.find(c => c.email === usuario.email) || null;
    }
    return null;
}

// Funções para salvar e recuperar empresas
export function salvarEmpresa(empresa: Empresa): void {
    const empresasAtuais = getEmpresas();
    empresasAtuais.push(empresa);
    localStorage.setItem(EMPRESAS_KEY, JSON.stringify(empresasAtuais));
    
    // Salvar email do usuário atual para identificação
    salvarUsuarioAtual({
        tipo: 'empresa',
        email: empresa.email
    });
}

export function getEmpresas(): Empresa[] {
    const empresasString = localStorage.getItem(EMPRESAS_KEY);
    return empresasString ? JSON.parse(empresasString) : [];
}

export function getEmpresaAtual(): Empresa | null {
    const usuario = getUsuarioAtual();
    if (usuario && usuario.tipo === 'empresa') {
        const empresas = getEmpresas();
        return empresas.find(e => e.email === usuario.email) || null;
    }
    return null;
}

// Função para atualizar uma empresa específica (útil para adicionar vagas)
export function atualizarEmpresa(empresaAtualizada: Empresa): void {
    const empresas = getEmpresas();
    const index = empresas.findIndex(e => e.email === empresaAtualizada.email);
    
    if (index !== -1) {
        empresas[index] = empresaAtualizada;
        localStorage.setItem(EMPRESAS_KEY, JSON.stringify(empresas));
    }
}

// Funções para gerenciar usuário atual
interface UsuarioAtual {
    tipo: 'candidato' | 'empresa';
    email: string;
}

export function salvarUsuarioAtual(usuario: UsuarioAtual): void {
    localStorage.setItem(USUARIO_ATUAL_KEY, JSON.stringify(usuario));
}

export function getUsuarioAtual(): UsuarioAtual | null {
    const usuarioString = localStorage.getItem(USUARIO_ATUAL_KEY);
    return usuarioString ? JSON.parse(usuarioString) : null;
}

// Funções para gerenciar vagas
export function getAllVagas(): Vaga[] {
    let todasVagas: Vaga[] = [];
    const empresas = getEmpresas();
    
    empresas.forEach(empresa => {
        if (empresa.vagas && empresa.vagas.length) {
            todasVagas = todasVagas.concat(empresa.vagas);
        }
    });
    
    return todasVagas;
}

