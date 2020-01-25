const singup = document.querySelector('#singup-form');

singup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = singup['email'].value;
  const password = singup['password'].value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

})

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    window.location.href = '/painel.html';
    // ...

  } else {
    // User is signed out.
    console.log('signed out');

    // ...
  }

});

/* firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});*/