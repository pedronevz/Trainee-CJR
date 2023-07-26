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
        </div>
		<label class="id_publicacao">${post.id}</label>
    </div>
`;
		postContainer.appendChild(postElement);
		const postClick = document.getElementById(`post_${post.id}`);
		postClick.addEventListener('click', () => {
			window.location.href = `feed_post_aberto_logado.html?post_id=${post.id}`
		});

	});

	const novaPublicacaoOpenModal = document.querySelector('.nova_publicacao_button');
	const closeButtonPublicacao = document.querySelector('#botao_fechar_modal_nova_publicacao');
	const modalPublicacao = document.querySelector('.criar_publicacao')
	closeButtonPublicacao.addEventListener('click', () => {
		modalPublicacao.close();
	});
	novaPublicacaoOpenModal.addEventListener('click', () => {
		modalPublicacao.showModal();
	});
};



function renderUsername(user) {
	const nameContainer = document.querySelector('.profile_name_navbar');
	const username = document.createElement('label');
	username.textContent = user[0].username;
	nameContainer.appendChild(username);

	const botaoSair = document.querySelector('.botao_sair');
	botaoSair.addEventListener('click', async () => {
		await fetch(`http://localhost:3000/logado`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"user": "any"
			})
		})
			.then((res) => res.json())
			.then((data) => console.log(data))
		window.location.href = 'feed.html'
	})
}

function preparePost(user) {
	const botaoPublicar = document.getElementById("botao_postar_nova_publicacao")

	botaoPublicar.addEventListener('click', evento => {
		evento.preventDefault();

		const postContent = document.getElementById('texto_nova_publicacao').value;

		fetch(`http://localhost:3000/post`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				"postContent": postContent,
				"postAuthor_id": user[0].user_id,
				"postAuthor": user[0].username
			})
		})
			.then((res) => res.json())
			.then((data) => console.log(data))

		alert('Publicação feita com sucesso')
		location.reload();
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

fetch('http://localhost:3000/logado')
	.then((res) => res.json())
	.then((data) => {
		const userLogado = data;
		console.log(userLogado);
		if (userLogado.length > 0) {
			renderUsername(userLogado);
			preparePost(userLogado);
		} else window.location.href = 'feed.html'

	})
	.catch((error) => {
		console.error('Error fetching user data:', error);
	});

