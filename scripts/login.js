const form = document.getElementById("form")

form.addEventListener('submit', async evento => {
    evento.preventDefault();
    
    const login = document.getElementById("txt_login").value;
    const senha = document.getElementById("txt_senha").value;
    

    await fetch(`http://localhost:3000/user?login=${login}`)
    .then(res => {
        if(!res.ok){
            alert("Usuário ou senha incorretos")
        }
        return res.json()
    })
    .then(async (data) =>  {
        console.log(data);
        if(data && data.senha === senha){
            await fetch(`http://localhost:3000/logado`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": login
                })
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            fetch(`http://localhost:3000/logado`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "user": login,
                    "id_user": data.id
                })
            })
            .then((res) => res.json())
            .then((data) => console.log(data))
            window.location.href = "feed_logado.html"
        }
        else {
            alert("Usuário ou senha incorretos")
        }
    })
})