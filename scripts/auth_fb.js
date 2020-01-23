auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      window.location.href = '/register.html';
      // ...
    } else {
      // User is signed out.
      // ...
    }
  });

  
  /*firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });*/

  const singupfbauth = document.querySelector('#register-form');

  singupfbauth.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = singupfbauth['email'].value;
    const password = singupfbauth['password'].value;

    auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  })

