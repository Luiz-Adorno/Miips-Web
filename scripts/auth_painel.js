auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('logged');

      // ...
  
    } else {
      // User is signed out.
      console.log('signed out');
      window.location.href = '/login.html';
  
      // ...
    }
  
  });