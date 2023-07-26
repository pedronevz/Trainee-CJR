const renderPosts = (mockedposts) => {
    const postContainer = document.querySelector('.feed_background')

    mockedposts.forEach(post => {
        const postElement = document.createElement('div')

        postElement.innerHTML = `
            <div class="post">
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
                </div>
            </div>
        `
        postContainer.appendChild(postElement)

    })
}

fetch('http://localhost:3000/post')
  .then((res) => res.json())
  .then((data) => {
    const posts = data;
    console.log(posts);
    renderPosts(posts);
  })
  .catch((error) => {
    console.error('Error fetching user data:', error);
  });

const commentBalloonButtons = document.querySelectorAll('.comment_balloon_button');
const modal = document.querySelector('.criar_comentario');
const closeButton = document.querySelector('.botao_fechar_modal');

commentBalloonButtons.forEach(openButton => {
    openButton.addEventListener('click', () => {
        modal.showModal();
    });
});

closeButton.addEventListener('click', () => {
    modal.close();
});

fetch('http://localhost:3000/logado')
	.then((res) => res.json())
	.then((data) => {
		const userLogado = data;
		console.log(userLogado);
		if (userLogado.length > 0) {
            window.location.href = 'feed_logado.html'
        }
	})
	.catch((error) => {
		console.error('Error fetching user data:', error);
	});