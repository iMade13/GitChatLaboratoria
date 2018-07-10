window.onload = () => {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                loggedIn.style.display = 'block';
                loggedOut.style.display = 'none';
                username.innerText = user.displayName;
            } else {
                loggedIn.style.display = 'none';
                loggedOut.style.display = 'block';
            }
            console.log('User > ' + JSON.stringify(user));
        });

    }
    //Register
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

//Logout
function logoutWithFirebase() {
    firebase.auth().signOut()
        .then(() => {
            console.log('Usuario finalizó su sesión')
        })
        .catch((error) => {
            console.log('Error en firebase > Código > ' + error.code); //nos muestra el tipo de error que produce
            console.log('Error de firebase > Mensaje > ' + error.message);
        });
}

//Login Facebook
function facebookLoginWithFirebase() {
    const provider = new firebase.auth.FacebookAuthProvider();

    provider.setCustomParameters({
        'display': 'popup'
    });

    firebase.auth().signInWithPopup(provider)
        .then(() => {
            console.log("Login con facebook exitoso")
        })
        .catch((error) => {
            console.log('Error en firebase > Código > ' + error.code); //nos muestra el tipo de error que produce
            console.log('Error de firebase > Mensaje > ' + error.message);
        })
}