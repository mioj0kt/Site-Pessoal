document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  // Usuário
  const username = 'mioj0kt';

  const repoName = urlParams.get('name');
  const description = urlParams.get('description');
  const repoUrl = urlParams.get('url');

  document.getElementById('repo-name').textContent = repoName;
  document.getElementById('repo-description').textContent = description;
  document.getElementById('repo-link-text').textContent = repoUrl;
  document.getElementById('repo-btn').href = repoUrl;

  fetch(`https://api.github.com/repos/${username}/${repoName}`)
    .then(response => response.json())
    .then(repo => {
      document.getElementById('estrela_info').textContent = repo.stargazers_count;
      document.getElementById('repo-date').textContent = new Date(repo.created_at).toLocaleDateString();
      document.getElementById('repo-language').textContent = repo.language || 'Não especificado';
    })
});