const singup = document.querySelector('#singup-form');

singup.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = singup['email'].value;

  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent.
    alert("Email enviado com sucesso!")
    window.location.href = '/login.html';
  }).catch(function(error) {
    // An error happened.
    alert("Email inválido")
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