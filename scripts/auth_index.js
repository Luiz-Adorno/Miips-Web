document.getElementById("btn_painel").addEventListener('click', function () {
  auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('logged');
      window.location.href = '/painel.html';
      // ...
  
    } else {
      // User is signed out.
      console.log('signed out');
      window.location.href = '/login.html';
      // ...
    }

  });
});

