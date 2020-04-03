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
    var idCode = sessionStorage.getItem("id_cod");
    console.log(idCode)
    if (cnpj === null) {
      window.location.href = 'estabelecimentos.html';
    }
    cnpj_new = cnpj.replace("/", "-");
    console.log(cnpj_new);
    console.log(doc_id);


    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local")
      .doc(cnpj_new).collection("Services").doc(idCode).get().then(function (doc) {
      if (doc.exists) {

        console.log("Document data:", doc.data());
        var url_photo = doc.data().url_service;
        var nameS = doc.data().nome_produto;
        var time = doc.data().time;
        var status = doc.data().state;
        var price = doc.data().valor;
        var date = doc.data().data_cadastro;
        var descri = doc.data().descri;

        document.getElementById("title_name").innerHTML = nameS;
        document.getElementById("barcode-id").innerHTML = " "+idCode;
        document.getElementById("price").innerHTML = price + "R$";
        document.getElementById("time").innerHTML = time;
        document.getElementById('avatar').src = url_photo;
        document.getElementById('descri').innerHTML = descri;
        document.getElementById('date').innerHTML = date;
        document.getElementById("preloader").style.display = "none";

        if (status) {
          document.getElementById('state').innerHTML = "Ativado";
          document.getElementById("state").className = "tags-on";
        } else {
          document.getElementById('state').innerHTML = "Desativado";
          document.getElementById("state").className = "tags-off";
        }

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


