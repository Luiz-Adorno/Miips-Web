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


    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local")
      .doc(cnpj_new).collection("Services").get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id);
          var url_photo = doc.data().url_service;
          var nameS = doc.data().nome_produto;
          var time = doc.data().time;
          var status = doc.data().state;
          var valor = doc.data().valor;
          var idCod = doc.data().id_cod;
          var data = doc.data().data_cadastro;
          var descri = doc.data().descri;

          document.querySelector('.card-body').insertAdjacentHTML('beforeend', `<div class="row" id="img_div">
            <div class="col-12 col-sm-12 col-md-3 text-center store">
            <img src=${url_photo} alt="prewiew" width="140" height="140">
            </div>
            <div id="text_div" class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
            <input type="text" id="on/off`+ doc.data().id_cod + `" disabled="disabled" class="input" value="" />
              <h4 class="product-name"><a href="#" id="title`+ idCod + `">${nameS}</a></h4>
              <h4>
              <strong style="font-size: 13px;">Código Interno do Serviço: </strong> <small>${idCod}</small>
              </h4>
              <h4>
              <strong style="font-size: 13px;">Valor cobrado: </strong><small>${valor} R$</small>
              </h4>
              <h4>
              <strong style="font-size: 13px;">Tempo de duração: </strong><small>${time}</small>
              </h4>
            </div>
          </div>
         `);

         document.getElementById("title" + idCod).addEventListener('click', function () {
          sessionStorage.setItem("id_cod", idCod);
          window.location.href = '/painel/serv_painel.html';
        });

          if (status == true) {
            document.getElementById("on/off" + doc.data().id_cod).style.color = 'green';
            document.getElementById("on/off" + doc.data().id_cod).style.width = '35%';
            document.getElementById("on/off" + doc.data().id_cod).setAttribute('value', 'Ativado');
          } else if (status == false) {
            document.getElementById("on/off" + doc.data().id_cod).style.color = 'red';
            document.getElementById("on/off" + doc.data().id_cod).style.width = '45%';
            document.getElementById("on/off" + doc.data().id_cod).setAttribute('value', 'Desativado');
          }

        });
        document.getElementById("preloader").style.display = "none";
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


