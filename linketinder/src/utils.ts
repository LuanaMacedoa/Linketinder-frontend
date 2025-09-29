// Função para converter string de skills em array
export function skillsToArray(skillsString: string): string[] {
    if (!skillsString.trim()) {
        return [];
    }
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill !== '');
}


// Função para gerar dados para o gráfico de skills
export function gerarDadosGraficoSkills(candidatos: any[]): { labels: string[], data: number[] } {
    const skills = new Map<string, number>();
    
    candidatos.forEach(candidato => {
        candidato.skills.forEach((skill: string) => {
            skills.set(skill, (skills.get(skill) || 0) + 1);
        });
    });
    
    // Ordenar as skills por quantidade e pegar as top 10
    const skillsOrdenadas = Array.from(skills.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    
    return {
        labels: skillsOrdenadas.map(entry => entry[0]),
        data: skillsOrdenadas.map(entry => entry[1])
    };
}
