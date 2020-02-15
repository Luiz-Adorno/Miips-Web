auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
    }
    // ...
    var cnpj = sessionStorage.getItem("last-cnpj");
    var doc_id = sessionStorage.getItem("doc.id");
    cnpj_new = cnpj.replace("/", "-");
    console.log(cnpj_new);
    console.log(doc_id);


    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        var nome_estabelecimento = doc.data().nome_estabelecimento;
        var estado = doc.data().estado;
        var cidade = doc.data().cidade;
        var rua = doc.data().rua;
        var url_photo = doc.data().profilePhoto;
        var status = doc.data().state;

        console.log(nome_estabelecimento)
        document.getElementById("title_name_esta").innerHTML = nome_estabelecimento;
        document.getElementById("local-city").innerHTML = " "+ cidade +"-"+ estado;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });

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


