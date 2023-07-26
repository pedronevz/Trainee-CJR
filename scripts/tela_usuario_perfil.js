function renderPosts(mockedposts) {
    const postContainer = document.querySelector('.feed_background');

    mockedposts.forEach((post) => {
        const postElement = document.createElement('div');

        postElement.innerHTML = `
    <div class="post" id="post_${post.id}">
        <div class="profile">
            <div class="profile_pic">
                <img class="profile_pic_image" src="/imagens/perfil.png" alt="foto_de_perfil">
            </div>
            <div class="profile_name">
                <label for="profile_name" id="profile_name">${post.author}</label>
                <label for="separador" id="separador">·</label>
                <label for="data" id="data">${post.date}</label>
            </div>
        </div>
        <div class="post_content">${post.content}</div>
        <div class="comment_balloon">
            <button class="comment_balloon_button">
                <img src="/imagens/commentballoon.png" alt="comment_balloon">
            </button>
            <label class="id_publicacao">${post.id}</label>
        </div>
    </div>
  `;
        postContainer.appendChild(postElement);
        const postClick = document.getElementById(`post_${post.id}`);
        postClick.addEventListener('click', (event) => {

            const postId = postClick.querySelector('#id_publicacao:last-child');

            const postClickedEvent = new CustomEvent('postClicked', {
                detail: { postId },
            });
            window.location.href = `feed_post_aberto_logado.html?post_id=${post.id}`
        });
    });

    const commentBalloonButtons = document.querySelectorAll('.comment_balloon_button');
    const modalComentario = document.querySelector('.criar_comentario');
    const closeButtonComentario = document.querySelector('#botao_fechar_modal_novo_comentario');

    commentBalloonButtons.forEach(openButton => {
        openButton.addEventListener('click', () => {
            modalComentario.showModal();
        });
    });

    closeButtonComentario.addEventListener('click', () => {
        modalComentario.close();
    });
};



function renderUserProfile(user) {
    const nameContainer = document.querySelector('.profile_name_navbar');
    const username = document.createElement('label');
    username.textContent = user.username; // Use the fetched user data
    nameContainer.appendChild(username);

    const bioContainer = document.querySelector('.bio');
    const bioDataHTML = `
        <div class="nome_perfil">
            <label for="nome_perfil" id="nome_perfil">${user.username}</label>
        </div>
        <div class="funcao_bio">
            <img class="funcao_imagem" src="/imagens/funcao_bio.png" alt="funcao_bio">
            <label for="funcao_imagem" id="funcao">${user.cargo}</label>
        </div>
        <div class="email_bio">
            <img class="email_imagem" src="/imagens/email_bio.png" alt="email_bio">
            <label for="email_imagem" id="email">${user.email}</label>
        </div>
    `;
    bioContainer.insertAdjacentHTML('beforeend', bioDataHTML);
}

async function fetchUserData() {

    var userLogado;

    await fetch('http://localhost:3000/logado')
        .then((res) => res.json())
        .then((data) => {
            userLogado = data;
            console.log(userLogado);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
        
    await fetch(`http://localhost:3000/user?userId=${userLogado[0].user_id}`)
        .then((res) => {
            if (!res.ok) {
                throw new Error("Network response was not ok");
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            console.log(userLogado[0].user_id)
            const user = data;
            renderUserProfile(user);
        })
        .catch((error) => {
            console.error("Error fetching user data:", error);
        });

    await fetch(`http://localhost:3000/post?user_id=${userLogado[0].user_id}`)
        .then((res) => res.json())
        .then((data) => {
            const posts = data;
            console.log(posts);
            renderPosts(posts);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });
}

fetchUserData()



