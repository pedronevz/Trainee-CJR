const form = document.getElementById("form")

form.addEventListener('submit', async evento => {
    evento.preventDefault();
    
    const nome = document.getElementById("txt_nome").value;
    const cargo = document.getElementById("txt_cargo").value;
    const email = document.getElementById("txt_email").value;
    const senha = document.getElementById("txt_senha").value;
    const genero = document.getElementById("select_genero").value;

    var status = 'ok';
    
    await fetch(`http://localhost:3000/user`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "user": nome,
            "senha": senha,
            "genero": genero[0],
            "email": email,
            "cargo": cargo
        })
    })
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        if (data === 'User já existente') status = 'not ok';
    })
    
    document.getElementById("txt_nome").value = '';
    document.getElementById("txt_cargo").value = '';
    document.getElementById("txt_email").value = '';
    document.getElementById("txt_senha").value = '';
    document.getElementById("select_genero").value = '';

    if (status === 'ok') alert('Cadastrado com sucesso!');
    else alert('Usuário já existe!')
});    
