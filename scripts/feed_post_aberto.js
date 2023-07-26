const mockedcomments = [
    {
        id: 1,
        title: 'Comentário 1',
        content: 'Eu sou o José!',
        author: 'José'
    },
    {
        id: 2,
        title: 'Comentário 2',
        content: 'Eu sou a Maria!',
        author: 'Maria'
    },
    {
        id: 3,
        title: 'Comentário 3',
        content: 'Eu sou o João!',
        author: 'João'
    },
    {
        id: 4,
        title: 'Comentário 4',
        content: 'Eu sou o Epaminondas!',
        author: 'James'
    },
    {
        id: 5,
        title: 'Comentário 5',
        content: 'Eu sou o Rodrigo!',
        author: 'Rodrigo'
    }
]

const renderComments = () => {
    const commentContainer = document.querySelector('.comments')

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
                        <label for="data" id="data">22 de jun</label>
                    </div>
                </div>
                <div class="post_text">${comment.content}</div>
            </div>
        `
        commentContainer.appendChild(commentElement)

    })
}

renderComments()

const openButton = document.querySelector('.botao_comentar');
const modal = document.querySelector('.criar_comentario');
const closeButton = document.querySelector('.botao_fechar_modal');

openButton.addEventListener('click', () => {
    modal.showModal();
});

closeButton.addEventListener('click', () => {
    modal.close();
});


