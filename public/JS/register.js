function validarSenha() {
    var senha = document.getElementById("senha").value;
    var senhaConfirm = document.getElementById("senha-confirm").value;

    return senha === senhaConfirm;
}

document.querySelector("form").addEventListener("submit", function(event) {
    if (!validarSenha()) {
        let aviso = document.getElementById('aviso-senha')
        aviso.innerHTML = 'Senhas não coincidem!'
        event.preventDefault(); // Impede o envio do formulário se as senhas não coincidirem
    }
});

const senhaInput = document.getElementById('senha');
const senhaConfirmInput = document.getElementById('senha-confirm');
const toggleSenhaButton = document.getElementById('toggle-senha');

// Adiciona um evento de clique ao botão para alternar a visibilidade da senha
toggleSenhaButton.addEventListener('click', function() {
    // Verifique se o tipo atual do input de senha é "password" ou "text"
    if (senhaInput.type === "password") {
        senhaInput.type = "text";  // Mostra a senha
        toggleSenhaButton.textContent = "Ocultar";  // Altera o texto do botão
    } else {
        senhaInput.type = "password";  // Oculta a senha
        toggleSenhaButton.textContent = "Mostrar";  // Altera o texto do botão
    }

    // Repetir o mesmo para o campo de confirmar senha, se necessário
    if (senhaConfirmInput.type === "password") {
        senhaConfirmInput.type = "text";  // Mostra a confirmação da senha
    } else {
        senhaConfirmInput.type = "password";  // Oculta a confirmação da senha
    }
});