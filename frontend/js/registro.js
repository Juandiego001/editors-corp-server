// Por el momento, todos los registros harán referencia a editores.
$(document).ready(() => {
    $('#formRegistro').submit(event => {
        let correoDato = $('#correo').val();
        let contrasenaDato = $('#contrasena').val();
        let vfContrasena = $('#vfContrasena').val();

        if ((contrasenaDato != vfContrasena) || 
                ((contrasenaDato == '') || (vfContrasena == ''))){
            alert('Las contraseñas no coninciden.')
        } else {
            let nickname = $('#nickname').val();
            let nicknameJson = {
                nick: nickname
            };
            
            if (nickname == ''){
                alert('Por favor, digita un nombre de usuario.')
            } else {

                $.get('http://localhost:3000/usuario-verificar-nick', nicknameJson, (data, err) => {

                    // Si ingresa en el condicional, es porque el nickname no existe,
                    // por lo tanto, se puede crear el usuario con dicho nick.                    
                    if (data == ''){
                        let apellidoDato = $('#apellido').val();
                        let nombreDato = $('#nombre').val() + ' ' + apellidoDato;

                        // Por el momento todos estarán en la categoría de cocina
                        let categoria = 'cocina';
                        let bio = $('#bio').val();
                        
                        // Datos a enviar organizados en formato JSON
                        let dataJson = {};
                        if (bio == '') {
                            dataJson = {
                                nick: nickname,
                                // Tipo 3 indica editor.
                                tipo: 3,
                                tipoEditor: categoria,
                                nombre: nombreDato,
                                correo: correoDato,
                                contrasena: contrasenaDato
                            }
                        } else {
                            dataJson = {
                                nick: nickname,
                                // Tipo 3 indica editor.
                                tipo: 3,
                                tipoEditor: categoria,
                                biografia: bio,
                                nombre: nombreDato,
                                correo: correoDato,
                                contrasena: contrasenaDato
                            }
                        }

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/usuario', {
                            method: 'POST',                            
                            data: JSON.stringify(dataJson),
                            contentType: 'application/json',

                            // Si todo funciona correctamente
                            success: data => {
                                alert('El usuario se ha registrado con éxito!');
                                console.log(data);
                            },

                            // Si ocurre un error
                            fail: err => {
                                alert('Ocurrió un error al intentar registrarse.');
                                console.log(err);
                            }
                        });

                    } else {
                        alert('El nombre de usuario ya existe');
                    }
                });
            }
            
        }

        event.preventDefault();
    });
});