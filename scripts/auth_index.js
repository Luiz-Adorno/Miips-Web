auth.onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
     // window.location.href = '/painel.html';
      console.log('xxx');
      // ...
    } else {
      // User is signed out.
      console.log('zzz');
      // ...
    }
  });

  /*  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }, function(error) {
    // An error happened.
  });*/