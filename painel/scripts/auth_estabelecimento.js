auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    document.getElementById('avatar_small').src = user.photoURL
    // ...

    //get the value from firestore and set
    //document.getElementById("on/off").value = "Johnny Bravo";
    const string = document.getElementById("on/off").value;

    if(string === "Ativado"){
      document.getElementById("on/off").style.color = 'green';
      document.getElementById("on/off").style.width = '35%';
      console.log("ta ativado")
    }else{
      document.getElementById("btn_on/off").classList.add('btn-outline-danger');
      document.getElementById("on/off").style.color = 'red';
      document.getElementById("on/off").style.width = '45%';
    }

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

