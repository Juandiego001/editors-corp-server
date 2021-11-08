$(document).ready(() => {

    // Eliminar usuario
    $('#eliminarUsuario').submit( event => {
        let nickname = $('#eNickname').val();
    
            if (nickname == ''){
                alert('Por favor, digita un nombre de usuario.')
            } else {
                let nicknameJson = {
                    nick: nickname
                };

                $.get('http://localhost:3000/usuario-verificar-nick', nicknameJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró el nickname
                    if (data != ''){

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/usuario', {
                                method: 'DELETE',
                                data: JSON.stringify(nicknameJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('El usuario se ha eliminado con éxito!');
                                    console.log(data);
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar eliminar el usuario.');
                                    console.log(err);
                                }
                            });
                    } else {
                        alert('Error. El nickname digitado no ha sido encontrado.');
                    }
                });
            }

        event.preventDefault();
    });
    

    // Actualizar usuario
    $('#actualizarUsuario').submit(event => {
        let correoDato = $('#aCorreo').val();
        let contrasenaDato = $('#aContrasena').val();
        let vfContrasena = $('#aVfContrasena').val();

        if ((contrasenaDato != vfContrasena) || 
                ((contrasenaDato == '') || (vfContrasena == ''))){
            alert('Las contraseñas no coninciden.')
        } else {
            let nickname = $('#aNickname').val();
    
            if (nickname == ''){
                alert('Por favor, digita un nombre de usuario.')
            } else {

                let nicknameJson = {
                    nick: nickname
                };

                $.get('http://localhost:3000/usuario-verificar-nick', nicknameJson, (data, err) => {

                    // Si ingresa por el condicional es porque efectivamente
                    // se encontró el nickname
                    if (data != ''){
                        let apellidoDato = $('#aApellido').val();
                        let nombreDato = $('#aNombre').val() + ' ' + apellidoDato;

                        // Datos a enviar organizados en formato JSON
                        let dataJson = {
                            nick: nickname,
                            nombre: nombreDato,
                            correo: correoDato,
                            contrasena: contrasenaDato
                        };

                        // Se envían los datos a la base de datos
                        $.ajax('http://localhost:3000/usuario', {
                                method: 'PUT',                            
                                data: JSON.stringify(dataJson),
                                contentType: 'application/json',

                                // Si todo funciona correctamente
                                success: data => {
                                    alert('El usuario se ha actualizado con éxito!');
                                    console.log(data);
                                },

                                // Si ocurre un error
                                fail: err => {
                                    alert('Ocurrió un error al intentar actualizar.');
                                    console.log(err);
                                }
                            });      
                    } else {
                        alert('Error. El nickname digitado no ha sido encontrado.');
                    }
                });
            }   
        }

        event.preventDefault();
    });

    // Crear usuario (similar a registrarse)
    $('#crearUsuario').submit(event => {
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
                        
                        // Datos a enviar organizados en formato JSON
                        let dataJson = {
                            nick: nickname,
                            // Tipo 3 indica editor.
                            tipo: 3,
                            tipoEditor: categoria,
                            nombre: nombreDato,
                            correo: correoDato,
                            contrasena: contrasenaDato
                        };

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

    // Listar todos los usuarios
    $('#listarUsuario').click(() => {
        $.get('http://localhost:3000/usuario-listar', (data, err) => {

            if (err != 'success'){
                alert('Ocurrió un error al intentar listar los usuarios.')
            } else {
                alert('Se obtuvieron los registros con éxito.');
                // Se eliminan los registros anteriores
                $('.my-3').remove();
                
                for (let objetos in data){
                    let divGeneral = document.createElement('div');
                    divGeneral.className = 'w-100 my-3 bg-info';
                    
                    let h3Usuario = document.createElement('h3');
                    h3Usuario.className = 'w-100 text-center text-light py-3 border-light border-bottom';
                    h3Usuario.innerHTML = `Usuario con Id ${data[objetos]._id}`;
                    
                    divGeneral.appendChild(h3Usuario);

                    let divContainer = document.createElement('div');
                    divContainer.className = 'w-100 m-0 p-0';

                    let keysObjetos = Object.keys(data[objetos]);
                    

                    // Se crean 7 campos
                    for (let i = 0; i < 7; i++){
                        let divCampo = document.createElement('div');
                        divCampo.className = 'w-100 row no-gutters py-2 text-light border-bottom border-light';

                        let h4Campo = document.createElement('h4');
                        h4Campo.className = 'col m-0';
                        h4Campo.innerHTML = keysObjetos[i];

                        let h4Valor = document.createElement('h4');
                        h4Valor.className = 'col m-0';
                        h4Valor.innerHTML = Object.values(data[objetos])[i];

                        divCampo.appendChild(h4Campo);
                        divCampo.appendChild(h4Valor);
                        divContainer.appendChild(divCampo);
                    }

                    divGeneral.appendChild(divContainer);

                    $('#seccionListar').append(divGeneral);
                }
            }
        })

    });


});