import { inicializarPerfilCandidato, inicializarPerfilEmpresa } from './perfil';

window.addEventListener('DOMContentLoaded', () => {
    const isPaginaCandidato = window.location.href.includes('perfil-candidato.html');
    const isPaginaEmpresa = window.location.href.includes('perfil-empresa.html');

    if (isPaginaCandidato) {
        inicializarPerfilCandidato();
    } else if (isPaginaEmpresa) {
        inicializarPerfilEmpresa();
    }

    if (isPaginaEmpresa) {
        const style = document.createElement('style');
        style.textContent = `
            .grafico-section {
                margin-bottom: 20px;
            }
            
            .grafico-barras {
                width: 100%;
            }
            
            .barra-container {
                display: flex;
                align-items: center;
                margin-bottom: 8px;
                width: 100%;
            }
            
            .barra-label {
                min-width: 120px;
                font-size: 14px;
                margin-right: 10px;
                text-align: right;
            }
            
            .barra {
                height: 20px;
                background-color: #3498db;
                color: white;
                display: flex;
                align-items: center;
                padding-left: 5px;
                border-radius: 3px;
                transition: width 0.5s ease;
                min-width: 30px;
            }
            
            .grafico-barras.skills .barra {
                background-color: #2ecc71;
            }
            
            .barra-valor {
                font-size: 12px;
                font-weight: bold;
            }
        `;
        document.head.appendChild(style);
    }
});
