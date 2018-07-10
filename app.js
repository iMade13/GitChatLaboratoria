function registerWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value; //traer los datos del document 

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('Usuario creado con éxito');
        })
        .catch((error) => {
            console.log('Error en firebase > Código > ' + error.code); //nos muestra el tipo de error que produce
            console.log('Error de firebase > Mensaje > ' + error.message);
        });
}

//Login
function loginWithFirebase() {
    const emailValue = email.value;
    const passwordValue = password.value; //traer los datos del document 

    firebase.auth().singInWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('Usuario inicio sesión con éxito');
        })
        .catch((error) => {
            console.log('Error en firebase > Código > ' + error.code); //nos muestra el tipo de error que produce
            console.log('Error de firebase > Mensaje > ' + error.message);
        });
}