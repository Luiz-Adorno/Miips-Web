auth.onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var email = user.email;
        var uid = user.uid;
        console.log(email, uid);
        document.getElementById('avatar_small').src = user.photoURL
        document.getElementById('avatar_small').src = user.photoURL
    } else {
        // User is signed out.
        console.log('signed out');
        window.location.href = '/login.html';

        // ...
    }

});

const send = document.querySelector('#changepass-form');

send.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    const password = send['password-old'].value;
    const password1 = send['password-n1'].value;
    const password2 = send['password-n2'].value;
    var credential = firebase.auth.EmailAuthProvider.credential(user.email, password);


    firebase.auth().currentUser.reauthenticateWithCredential(credential).then(function () {
        // User re-authenticated.

        // If password not entered 
        if (password1 == '')
            alert("Por favor digite uma senha");

        // If confirm password not entered 
        else if (password2 == '')
            alert("Por favor confirme sua senha");

        // If Not same return False.     
        else if (password1 != password2) {
            alert("\nSenhas diferentes, tente novamente")
            return false;
        }

        //if are less than 6 char
        else if (password1.length < 6 || password2.length < 6) {
            alert("\nA senha deve conter no mínimo 6 caracteres")
            return false;
        }

        // If same return True. 
        else {
            user.updatePassword(password2).then(function() {
                // Update successful.
                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                  }, function (error) {
                    // An error happened.
                  });
              }).catch(function(error) {
                // An error happened.
              });
        }

    }).catch(function (error) {
        // An error happened.

    });

})

document.getElementById("btn_logout").addEventListener('click', function () {
    firebase.auth().signOut().then(function () {
      // Sign-out successful.
    }, function (error) {
      // An error happened.
    });
  });




