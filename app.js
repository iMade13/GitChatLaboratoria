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
        firebase.database().ref('gifs')
            // .limitToLast(2) //filtro de datos donde lo limito auna cantidad 
            .once('value') //para escuchar los datos una sola vez 
            .then((gifs) => {
                console.log('Gif >' + JSON.stringify(gifs));
            })
            .catch((error) => {
                console.log('Data base error >' + error);
            })

        firebase.database().ref('gifs')
            .limitToLast(1)
            .on('child_added', (newGif) => {
                gifContainer.innerHTML += `
                <p>${newGif.val().creatorName}</p>
                <img style='width:200px' src='${newGif.val().gifURL}'></img>
              `;
            }); //se escucha cada gif a la colección

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
//Enviar gif
function sendGif() {
    const gifValue = gifArea.value;

    const newGifKey = firebase.database().ref().child('gifs').push().key;
    const currentUser = firebase.auth().currentUser;

    firebase.database().ref(`gifs/${newGifKey}`).set({
        gifURL: gifValue,
        creatorName: currentUser.displayName,
        creater: currentUser.uid
    });
}

//Opcion para enviar foto
function sendPhotoToStorage() {
    const photoFile = photoFileSelector.files[0];
    const fileName = photoFile.name;
    const metadata = {
        contentType: photoFile.type
    };

    const task = firebase.storage().ref('images')
        .child(fileName)
        .put(photoFile, metadata);

    task.then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
            console.log('URL del archivo > ' + url);
        });
}