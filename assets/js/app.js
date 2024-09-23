//Usuário
const username = 'mioj0kt';

// GitHub API endpoint
const apiUrl = `https://api.github.com/users/${username}`;

// GitHub API endpoint para seguidores
const apifollowUrl = `https://api.github.com/users/${username}/followers`;

// Pegando informação com a API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {

    // Atualizando elementos DOM com as informações pegas
    document.getElementById('avatar').src = data.avatar_url;
    document.getElementById('nome').textContent = data.name;
    document.getElementById('github-link').href = data.html_url;
    document.getElementById('github-link').textContent = data.html_url;
    document.getElementById('bio').textContent = data.bio || 'Sem descrição';
    document.getElementById('local').textContent = data.location || 'Localização não informada';

    // Checando se o nome está disponivel
    if (data.twitter_username) {
      const twitterLink = `https://twitter.com/${data.twitter_username}`;
      document.getElementById('twitter-link').href = twitterLink;
    }    

    //adicionando instagram e linkedin manualmente
    const linkedinLink = 'https://www.linkedin.com/in/matheus-felipe-2a237b24a/';
    document.getElementById('linkedin-link').href = linkedinLink;

    const instagramLink = 'https://www.instagram.com/matheguy.png';
    document.getElementById('instagram-link').href = instagramLink;

  })

fetch(apifollowUrl)
  .then(response => response.json())
  .then(data => {

    // Número de seguidores
    const followersCount = data.length;
    document.getElementById('number').textContent = followersCount;

  })

  .catch(error => console.error('Erro ao buscar info:', error));

document.addEventListener('DOMContentLoaded', function () {

  fetch(`https://api.github.com/users/${username}/repos`)
    .then(response => response.json())
    .then(repos => {
      const repoCards = document.getElementById('repo-cards');

      document.getElementById('repo-number').textContent = `(${repos.length})`

      repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
                <div class="card">
                  <div class="card-body p-4">
                    <h3 class="card-title text-center">${repo.name}</h3>
                    <p class="card-text text-center my-4">${repo.description || 'Sem descrição'}</p>
                    <div class="d-flex justify-content-center">
                    <a href="repo.html?name=${repo.name}&description=${encodeURIComponent(repo.description || 'Sem descrição')}&url=${repo.html_url}" class="btn btn-primary my-3">Ver Repositório</a>
                  </div>
                  </div>
                </div>
              `;

        repoCards.appendChild(card);
      });
    })
    .catch(error => console.error('Erro ao buscar repositórios:', error));
});

document.addEventListener('DOMContentLoaded', () =>{
  fetchContentSugerido();
} );

function fetchContentSugerido() {
  fetch('conteudos.json')
      .then(response => response.json())
      .then(conteudos => {
          const carouselInner = document.getElementById('carousel-inner');
          const carouselIndicators = document.getElementById('carousel-indicators');
          conteudos.forEach((conteudo, index) => {
              const isActive = index === 0 ? 'active' : '';
              const carouselItem = `
                  <div class="carousel-item ${isActive}">
                      <a href="${conteudo.link}" target="_blank">
                          <img src="${conteudo.image}" class="d-block w-100" alt="${conteudo.title}">
                      </a>
                      <div class="carousel-caption d-none d-md-block">
                          <h5>${conteudo.title}</h5>
                          <p>${conteudo.description}</p>
                      </div>
                  </div>`;
              carouselInner.innerHTML += carouselItem;
              carouselIndicators.innerHTML += `<button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="${index}" class="${isActive}" aria-current="true" aria-label="Slide ${index + 1}"></button>`;
          });
      });
}
