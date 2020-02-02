auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    window.location.href = '/register.html';
    // ...
  } else {
    // User is signed out.
    // ...
  }
});


const singupfbauth = document.querySelector('#register-form');

singupfbauth.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = singupfbauth['email'].value;
  const password1 = singupfbauth['password1'].value;
  const password2 = singupfbauth['password2'].value;

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
    auth.createUserWithEmailAndPassword(email, password1).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

})

document.getElementById("btn_logout").addEventListener('click', function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }, function (error) {
    // An error happened.
  });
});
