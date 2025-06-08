document.addEventListener('DOMContentLoaded', function() {
  // Configurações
  const githubUsername = 'elielsonjr';
  const maxProjects = 6; // Número máximo de projetos a exibir
  const excludeRepos = ['elielsonjr']; // Repositórios para excluir
  
  // Elementos DOM
  const projectsContainer = document.getElementById('github-projects');
  
  // Função para carregar projetos do GitHub
  async function loadGitHubProjects() {
    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&direction=desc`);
      const repos = await response.json();
      
      // Filtra e limita os repositórios
      const filteredRepos = repos
        .filter(repo => !repo.fork && !excludeRepos.includes(repo.name))
        .slice(0, maxProjects);
      
      // Limpa o container
      projectsContainer.innerHTML = '';
      
      // Adiciona cada projeto ao DOM
      filteredRepos.forEach(repo => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        projectCard.innerHTML = `
          <h3>${repo.name}</h3>
          <p>${repo.description || 'Sem descrição disponível'}</p>
          <div class="project-meta">
            <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
            <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
            <span><i class="fas fa-circle" style="color: ${repo.language ? '#00f0ff' : '#8a8a9e'}"></i> ${repo.language || 'Vários'}</span>
          </div>
          <a href="${repo.html_url}" target="_blank" class="project-link">
            <i class="fab fa-github"></i> Ver no GitHub
          </a>
        `;
        projectsContainer.appendChild(projectCard);
      });
      
    } catch (error) {
      console.error('Erro ao carregar projetos do GitHub:', error);
      projectsContainer.innerHTML = `
        <div class="project-card">
          <h3>Erro ao carregar projetos</h3>
          <p>Não foi possível carregar os projetos do GitHub no momento.</p>
          <a href="https://github.com/${githubUsername}?tab=repositories" target="_blank" class="project-link">
            <i class="fab fa-github"></i> Ver todos no GitHub
          </a>
        </div>
      `;
    }
  }
  
  // Carrega os projetos quando a página é carregada
  loadGitHubProjects();
});