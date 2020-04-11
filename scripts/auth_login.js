const singup = document.querySelector('#singup-form');

singup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = singup['email'].value;
  const password = singup['password'].value;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Senha incorreta");
    // ...
  });

})

auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    window.location.href = '/painel/index.html';
    // ...

  } else {
    // User is signed out.
    console.log('signed out');

    // ...
  }

});

document.getElementById("cadastrar").addEventListener('click', function () {
  window.location.href = '/contract.html';
});

document.getElementById("resetPas").addEventListener('click', function () {
  window.location.href = '/reset_pass.html';
});