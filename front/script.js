// document.addEventListener('DOMContentLoaded', function () {
//   document.getElementById('login-button').addEventListener('click', function () {
//     // Redirecionar para a página home.html
//     window.location.href = 'home.html';
//   });
// });


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('login-button').addEventListener('click', async function () {
    // Capturar os dados dos campos username e password
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Criar o objeto JSON com os dados capturados
    const loginData = {
      username: username,
      password: password
    };

    console.log('Login Data:', loginData);

    try {
      // Enviar a requisição POST ao backend
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      console.log('Response Status:', response.status);

      const data = await response.json();

      console.log('Response Data:', data);

      // Tratar a resposta do servidor
      if (response.ok && data.success) {
        alert(data.message); // Exibe a mensagem de sucesso
        // Redirecionar para a página home.html
        window.location.href = 'home.html';
      } else {
        alert('Usuário e senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      alert('Erro ao realizar login. Por favor, tente novamente.');
    }
  });
});