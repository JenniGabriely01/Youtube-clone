/* 
   Este código está consumindo uma API local para exibir vídeos em um contêiner na página HTML.
*/

const containerVideo = document.querySelector('.videos__container');

/* Função assíncrona para buscar e exibir vídeos */
async function buscareMostrarVideo() {
    /* Tentativa de buscar e exibir vídeos */
    try {
        /* Faz uma solicitação GET para a API local e aguarda a resposta */
        const busca = await fetch("http://localhost:3000/videos");
        /* Converte a resposta para JSON */
        const videos = await busca.json();

        /* Itera sobre cada vídeo recebido */
        videos.forEach((video) => {
            /* Verifica se o vídeo possui categoria */
            if (video.categoria == "") {
                /* Se o vídeo não tiver categoria, lança um erro */
                throw new Error('Vídeo não possui categoria');
            }

            /* Adiciona o HTML de cada vídeo ao contêiner de vídeo */
            containerVideo.innerHTML += `
                <li class="videos__item"> 
                    <iframe src="${video.url}" title="${video.titulo}" frameborder="0" allowFullscreen></iframe>

                    <div class="descricao-video">
                        <img class="img-canal" src="${video.imagem}"> </img>
                        <h3 class="titulo-video">${video.titulo}</h3>
                        <p class="titulo-canal">${video.descricao}</p>
                        <p class="categoria" hidden>${video.categoria}</p>
                    </div>
                </li>
            `;
        });
    } catch (error) { /* Se ocorrer algum erro durante a busca ou exibição dos vídeos */
        /* Exibe uma mensagem de erro no contêiner de vídeo */
        containerVideo.innerHTML = `<p>Houve um erro ao carregar os vídeos...</p>`;
    }
}

/* Chama a função para buscar e exibir os vídeos */
buscareMostrarVideo();


const barraDePesquisa = document.querySelector('.pesquisar__input');

// Adiciona um ouvinte de evento à barra de pesquisa que é acionado sempre que o usuário digita algo
barraDePesquisa.addEventListener('input', filtrarPesquisa);

// Função que filtra os vídeos com base no texto digitado na barra de pesquisa
function filtrarPesquisa() {

    const videos = document.querySelectorAll('.videos__item');

    // Verifica se a barra de pesquisa não está vazia
    if (barraDePesquisa.value != "") {
        // Loop através de cada vídeo
        for (let video of videos) {
            // Obtém o texto do título do vídeo e converte para minúsculas
            let titulo = video.querySelector('.titulo-video').textContent.toLowerCase();
            // Obtém o valor atual digitado na barra de pesquisa e converte para minúsculas
            let valorFiltro = barraDePesquisa.value.toLowerCase();

            // Verifica se o texto digitado está contido no título do vídeo
            if (!titulo.includes(valorFiltro)) {
                // Se não estiver contido, oculta o vídeo
                video.style.display = "none";
            } else {
                // Se estiver contido, exibe o vídeo
                video.style.display = "block";
            }
        }
    } else {
        // Se a barra de pesquisa estiver vazia, exibe todos os vídeos
        for (let video of videos) {
            video.style.display = "block";
        }
    }
}


// Seleciona todos os elementos com a classe '.superior__item' e os armazena na variável 'botaoCategoria'
const botaoCategoria = document.querySelectorAll('.superior__item');

// Itera sobre cada botão de categoria
botaoCategoria.forEach((botao) => {
    // Obtém o nome da categoria do atributo 'name' do botão
    let nomeCategoria = botao.getAttribute("name"); /* buscando o atributo name que está no html */
    
    // Adiciona um ouvinte de evento de clique a cada botão de categoria
    botao.addEventListener('click', () => filtrarPorCategoria(nomeCategoria));
});

// Função para filtrar os vídeos por categoria
function filtrarPorCategoria(filtro){
    // Seleciona todos os elementos com a classe '.videos__item' e os armazena na variável 'videos'
    const videos = document.querySelectorAll('.videos__item');
    
    // Itera sobre cada vídeo
    for(let video of videos){
        // Obtém o texto da categoria do vídeo e converte para minúsculas
        let categoria = video.querySelector('.categoria').textContent.toLowerCase();
        // Converte o filtro para minúsculas
        let valorFiltro = filtro.toLowerCase();

        // Verifica se a categoria do vídeo inclui o filtro e se o filtro não é 'tudo'
        if (!categoria.includes(valorFiltro) && valorFiltro != 'tudo') {
            // Se a categoria do vídeo não incluir o filtro e o filtro não for 'tudo', oculta o vídeo
            video.style.display = "none";
        } else {
            // Caso contrário, exibe o vídeo
            video.style.display = "block";
        }
    }
}

