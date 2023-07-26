function getPostId() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post_id');
    return postId;
}

async function renderComments(mockedcomments) {
    const commentContainer = document.querySelector('.comments')
    console.log(mockedcomments)

    mockedcomments.forEach(comment => {
        const commentElement = document.createElement('div')

        commentElement.innerHTML = `
            <div class="comment">
                <div class="profile">
                    <div class="profile_pic">
                        <img class="profile_pic_image" src="/imagens/perfil.png" alt="foto_de_perfil">
                    </div>
                    <div class="profile_name">
                        <label for="profile_name" id="profile_name">${comment.author}</label>
                        <label for="separador" id="separador">·</label>
                        <label for="data" id="data">${comment.date}</label>
                    </div>
                </div>
                <div class="post_text">${comment.content}</div>
            </div>
        `
        commentContainer.appendChild(commentElement)
    })
    const openButton = document.querySelector('.botao_comentar');
    const modal = document.querySelector('.criar_comentario');
    const closeButton = document.querySelector('.botao_fechar_modal');

    openButton.addEventListener('click', () => {
        modal.showModal();
    });

    closeButton.addEventListener('click', () => {
        modal.close();
    });
}

function renderUsername(user) {
    const nameContainer = document.querySelector('.profile_name_navbar');
    const username = document.createElement('label');
    username.textContent = user[0].username; // Use the fetched user data
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

async function renderPostContent() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post_id');
    console.log(postId);


    var post;

    await fetch(`http://localhost:3000/post?post_id=${postId}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            post = data;
        })
        .catch((error) => {
            console.error('Error fetching post data:', error);
        });

    var userLogado;

    await fetch('http://localhost:3000/logado')
        .then((res) => res.json())
        .then((data) => {
            userLogado = data;
        })
        .catch((error) => {
            console.error('Error fetching user data:', error);
        });


    const postContainer = document.querySelector('.post_aberto');
    const postContent = document.createElement('div')

    postContent.innerHTML = `
    <div class="post_content">
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
            <div class="post_text">${post.content}</div>
        </div>`;

    postContainer.insertBefore(postContent, postContainer.firstChild);

    if (userLogado[0].user_id === post.user_id) {
        const container = document.querySelector('.profile');
        const botaoDeletar = document.createElement('button');
        botaoDeletar.className = 'delete_post_button';
        botaoDeletar.textContent = 'Excluir';
        container.appendChild(botaoDeletar);
        botaoDeletar.addEventListener('click', async () => {
            await fetch(`http://localhost:3000/post/${postId}`, {
                method: 'DELETE',
            })
                .then((res) => {
                    if (!res.ok) {
                        throw new Error('Failed to delete the post.');
                    }
                    return res.json();
                })
                .then((data) => {
                    console.log(data);
                })
                .catch((error) => {
                    console.error('Error deleting post:', error);
                });
            alert('Publicação Excluída!');
            window.location.href = `feed_logado.html`
        });
    }

    else console.log(userLogado[0].user_id)

}

function prepareComment(user) {
    const botaoPublicar = document.getElementById("botao_postar_novo_comentario")
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('post_id');

    botaoPublicar.addEventListener('click', evento => {
        evento.preventDefault();

        const commentContent = document.getElementById('texto_novo_comentario').value;

        fetch(`http://localhost:3000/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "post_id": parseInt(postId),
                "commentAuthor_id": user[0].user_id,
                "commentContent": commentContent,
                "commentAuthor": user[0].username
            })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

        alert('Comentário publicado')
        location.reload()
    })
}

fetch('http://localhost:3000/logado')
    .then((res) => res.json())
    .then((data) => {
        const userLogado = data;
        console.log(userLogado);
        renderUsername(userLogado);
        prepareComment(userLogado);
    })
    .catch((error) => {
        console.error('Error fetching user data:', error);
    });

renderPostContent()

fetch(`http://localhost:3000/comments?post_id=${getPostId()}`)
  .then((res) => res.json())
  .then((data) => {
    const comments = data;
    renderComments(comments);
    console.log(data); // This will log the comments data to the console
  })
  .catch((error) => {
    console.error('Error fetching comments:', error);
  });






