auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    user.updateProfile({
      photoURL: "https://firebasestorage.googleapis.com/v0/b/miips-3cdbd.appspot.com/o/users%2FRyLgIvzN6WUIY69xFkLq1UnzM0z1%2Fimages%2FprofilePhoto%2Fimage%253A62254?alt=media&token=5468d38f-512f-4c54-aad9-cf933e55f85e"
    }).then(function() {
      // Update successful.
    }).catch(function(error) {
      // An error happened.
    });
  // ...


    // ...

  } else {
    // User is signed out.
    console.log('signed out');
    window.location.href = '/login.html';

    // ...
  }

});

document.getElementById("btn_logout").addEventListener('click', function () {
  firebase.auth().signOut().then(function () {
    // Sign-out successful.
  }, function (error) {
    // An error happened.
  });
});


