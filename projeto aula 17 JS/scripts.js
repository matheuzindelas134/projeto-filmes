const resultado = document.querySelector("#resultado");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search");
const inicioLink = document.querySelector("#inicio-link");
const filmesLink = document.querySelector("#filmes-link");
const seriesLink = document.querySelector("#series-link");

const apiKey = '77c4e2b070a2e1396500d0b42ebf7cec';
const apiUrl = 'https://api.themoviedb.org/3';

async function carregarFilmesPopulares() {
    try {
        const resposta = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}&language=pt-BR`);
        const dados = await resposta.json();
        
        resultado.innerHTML = '';
        
        dados.results.forEach((element) => {
            const card = document.createElement("div");
            card.className = "card";

            const texto = document.createElement("p");
            texto.textContent = element.title;
            texto.className = "texto";

            const imagem = document.createElement("img");
            imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            imagem.className = "image-element";

            card.append(texto, imagem);

            resultado.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        resultado.textContent = "Erro ao consumir a API. Por favor, verifique a URL.";
    }
}

async function buscarFilmes(query) {
    try {
        const resposta = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&language=pt-BR&query=${encodeURIComponent(query)}`);
        const dados = await resposta.json();

        resultado.innerHTML = '';

        if (dados.results.length === 0) {
            resultado.textContent = 'Nenhum filme encontrado.';
            return;
        }

        dados.results.forEach((element) => {
            const card = document.createElement("div");
            card.className = "card";

            const texto = document.createElement("p");
            texto.textContent = element.title;
            texto.className = "texto";

            const imagem = document.createElement("img");
            imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            imagem.className = "image-element";

            card.append(texto, imagem);

            resultado.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        resultado.textContent = "Erro ao consumir a API. Por favor, verifique a URL.";
    }
}
async function carregarSeriesPopulares() {
    try {
        const resposta = await fetch(`${apiUrl}/tv/popular?api_key=${apiKey}&language=pt-BR`);
        const dados = await resposta.json();

        resultado.innerHTML = '';
        
        dados.results.forEach((element) => {
            const card = document.createElement("div");
            card.className = "card";

            const texto = document.createElement("p");
            texto.textContent = element.name;
            texto.className = "texto";

            const imagem = document.createElement("img");
            imagem.src = `https://image.tmdb.org/t/p/w500${element.poster_path}`;
            imagem.className = "image-element";

            card.append(texto, imagem);

            resultado.appendChild(card);
        });
    } catch (error) {
        console.error(error);
        resultado.textContent = "Erro ao consumir a API. Por favor, verifique a URL.";
    }
}

async function carregarFilmesESeriesPopulares() {
    resultado.innerHTML = ''; // Limpa o conteúdo antes de carregar os dados
    await Promise.all([carregarFilmesPopulares(), carregarSeriesPopulares()]);
}

inicioLink.addEventListener("click", function(event) {
    event.preventDefault();
    carregarFilmesESeriesPopulares();
});

filmesLink.addEventListener("click", function(event) {
    event.preventDefault();
    carregarFilmesPopulares();
});

seriesLink.addEventListener("click", function(event) {
    event.preventDefault();
    carregarSeriesPopulares();
});

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
        buscarFilmes(query);
    } else {
        resultado.textContent = 'Digite um termo de pesquisa.';
    }
});

// Carregar filmes e séries populares ao inicializar a página
carregarFilmesESeriesPopulares();
