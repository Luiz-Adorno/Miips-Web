auth.onAuthStateChanged(function (user) {
  if (user) {
    console.log(user.uid)
    // User is signed in.
    console.log('logged');
    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
    }
    // ...

    //get the value from firestore and set
    //document.getElementById("on/off").value = "Johnny Bravo";
    const string = document.getElementById("on/off").value;
    

    db.collection("companies").doc(user.uid).collection("commercialPlace").get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id);

          db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc.id).collection("local").get().then(querySnapshot2 => {
            querySnapshot2.forEach(doc2 => {
              var nome_estabelecimento= doc2.data().nome_estabelecimento;
              var estado = doc2.data().estado;
              var cidade = doc2.data().cidade;
              var rua = doc2.data().rua;
              var url_photo = doc2.data().profilePhoto;
              var status = doc2.data().status;
              console.log(doc2.data());
            });
          });
        });
      });

    if (string === "Ativado") {
      document.getElementById("on/off").style.color = 'green';
      document.getElementById("on/off").style.width = '35%';
      console.log("ta ativado")
    } else {
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

