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
      .doc(cnpj_new).collection("Products").get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          console.log(doc.id);
          var name_prod = doc.data().nome_produto;
          var codebar = doc.data().cod_barras;
          var status = doc.data().state;
          var price = doc.data().valor;
          var qnt = doc.data().quantidade;
          var url_photo = doc.data().url_product;

          document.querySelector('.card-body').insertAdjacentHTML('beforeend', `<div class="row" id="img_div">
            <div class="col-12 col-sm-12 col-md-2 text-center store">
              <img src=${url_photo} alt="prewiew" width="70" height="120">
            </div>
            <div id="text_div" class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
              <h4 class="product-name"><a href="#" id="title`+ doc.data().cod_barras + `">${name_prod}</a></h4>
              <h4>
              <strong style="font-size: 13px;">Código de barras: </strong> <small>${codebar}</small>
              </h4>
              <h4>
              <strong style="font-size: 13px;">Preço: </strong><small>${price}</small>
              </h4>
              <h4>
              <strong style="font-size: 13px;">Quantidade: </strong><small>${qnt}</small>
              </h4>
            </div>
            <div class="col-12 col-sm-12 text-sm-center col-md-4 text-md-right row">
            <div class="text-right">
                <input type="text" id="on/off`+ doc.data().cod_barras + `" disabled="disabled" class="input" value="" />
            </div>
            </div>
          </div>
         `);

         document.getElementById("title" + doc.data().cod_barras).addEventListener('click', function () {
          sessionStorage.setItem("codebar", codebar);
          window.location.href = '/painel/produ_painel.html';
        });

          if (status == true) {
            document.getElementById("on/off" + doc.data().cod_barras).style.color = 'green';
            document.getElementById("on/off" + doc.data().cod_barras).style.width = '35%';
            document.getElementById("on/off" + doc.data().cod_barras).setAttribute('value', 'Ativado');
          } else if (status == false) {
            document.getElementById("on/off" + doc.data().cod_barras).style.color = 'red';
            document.getElementById("on/off" + doc.data().cod_barras).style.width = '45%';
            document.getElementById("on/off" + doc.data().cod_barras).setAttribute('value', 'Desativado');
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


