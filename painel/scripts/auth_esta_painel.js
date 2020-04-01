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
    if (cnpj === null) {
      window.location.href = 'estabelecimentos.html';
    }
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
        var nro = doc.data().numero;
        var tel = doc.data().telefone;
        var cnpj = doc.data().cnpj;
        var cep = doc.data().cep;
        var bairro = doc.data().bairro;
        var status = doc.data().state;
        var nro_pro = doc.data().product_count;
        var nro_serv = doc.data().servi_count;

        console.log(nome_estabelecimento)
        document.getElementById("title_name").innerHTML = nome_estabelecimento;
        document.getElementById("local-city").innerHTML = " " + cidade + "-" + estado;
        document.getElementById("rua_nro").innerHTML = rua + " - " + nro;
        document.getElementById("tel").innerHTML = tel;
        document.getElementById('avatar').src = url_photo;
        document.getElementById('cep').innerHTML = cep;
        document.getElementById('bairro').innerHTML = bairro;
        document.getElementById('cnpj').innerHTML = cnpj;
        document.getElementById("preloader").style.display = "none";

        if (status) {
          document.getElementById('state').innerHTML = "Ativado";
          document.getElementById("state").className = "tags-on";
        } else {
          document.getElementById('state').innerHTML = "Desativado";
          document.getElementById("state").className = "tags-off";
        }



        db.collection("companies").doc(user.uid).get().then(function (doc) {
          if (doc.exists) {
            let cate = new Array();
            cate = doc.data().category;
            console.log(cate.length)
            if (cate.length == 2) {
              if(nro_pro == null){
                nro_pro = 0
              }
              if(nro_serv == null){
                nro_serv = 0
              }
              document.getElementById("prod").style.display = "block";
              document.getElementById("serv").style.display = "block";
              document.getElementById('number_pro').innerHTML = nro_pro;
              document.getElementById('number_serv').innerHTML = nro_serv;

            } else {
              if (cate[0] == "Produto") {
                if(nro_pro == null){
                  nro_pro = 0
                }
                document.getElementById("prod").style.display = "block";
                document.getElementById('number_pro').innerHTML = nro_pro;
              } else {
                if(nro_serv == null){
                  nro_serv = 0
                }
                document.getElementById("serv").style.display = "block";
                document.getElementById('number_serv').innerHTML = nro_serv;
              }
            }

          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });


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


