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
    var barcode = sessionStorage.getItem("codebar");
    console.log(barcode)
    if (cnpj === null) {
      window.location.href = 'estabelecimentos.html';
    }
    cnpj_new = cnpj.replace("/", "-");
    console.log(cnpj_new);
    console.log(doc_id);


    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local")
      .doc(cnpj_new).collection("Products").doc(barcode).get().then(function (doc) {
      if (doc.exists) {

        console.log("Document data:", doc.data());
        var name_prod = doc.data().nome_produto;
        var codebar = doc.data().cod_barras;
        var status = doc.data().state;
        var price = doc.data().valor;
        var qnt = doc.data().quantidade;
        var url_photo = doc.data().url_product;
        var date = doc.data().data_cadastro;
        var descri = doc.data().descri;
        var gender = doc.data().gender;
        var cate = doc.data().product_category;

        document.getElementById("cate").innerHTML = cate;
        document.getElementById("gender").innerHTML = gender;
        document.getElementById("title_name").innerHTML = name_prod;
        document.getElementById("barcode-id").innerHTML = " "+codebar;
        document.getElementById("price").innerHTML = price + "R$";
        document.getElementById("qnt").innerHTML = qnt;
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


