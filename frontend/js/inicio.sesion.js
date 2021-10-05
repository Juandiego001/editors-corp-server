// Valida el inicio de sesión
function validarInicio(data){
    if (data == ''){
        alert('Error. Nickname o contraseña incorrectos.');
    }
}

$(document).ready(function(){

    // Se intenta enviar el Formulario de iniciar sesión
    $("#formInicio").submit(function (event) {
        let nickname = $('#nickname').val();
        let password = $('#contrasena').val();
        let dataLogIn = {
            nick: nickname,
            contrasena: password
        };
        
        $.get('http://localhost:3000/usuario', dataLogIn, function (data, err)  {
            if (err != 'success'){
                alert('Ocurrió un error: ' + err);
            }
            validarInicio(data);
        });
        
        event.preventDefault();
    });
    
});