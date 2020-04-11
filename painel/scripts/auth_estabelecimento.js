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
    // const string = document.getElementById("on/off").value;

    db.collection("companies").doc(user.uid).collection("commercialPlace").get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {

          db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc.id).collection("local").get().then(querySnapshot2 => {
            querySnapshot2.forEach(doc2 => {
              console.log(doc.id)
              var nome_estabelecimento = doc2.data().nome_estabelecimento;
              var estado = doc2.data().estado;
              var cidade = doc2.data().cidade;
              var rua = doc2.data().rua;
              var url_photo = doc2.data().profilePhoto;
              var status = doc2.data().state;

              document.querySelector('.card-body').insertAdjacentHTML('beforeend', `<div class="row" id="img_esta">
              <div class="col-12 col-sm-12 col-md-4 text-center store">
                <img src=${url_photo} alt="prewiew" width="140" height="140"  id="img` + doc2.data().cnpj + `">
              </div>
              <div id="text_div" class="col-12 text-sm-center col-sm-12 text-md-left col-md-6">
              <input type="text" id="on/off`+ doc2.data().cnpj + `" disabled="disabled" class="input" value="" />
                <h4 class="product-name"><a href="#" id="title`+ doc2.data().cnpj + `">${nome_estabelecimento}</a></h4>
                <h4>
                  <small>${estado}</small>
                </h4>
                <h4>
                  <small>${cidade}</small>
                </h4>
                <h4>
                  <small>${rua}</small>
                </h4>
              </div>
            </div>
           `);

              document.getElementById("img" + doc2.data().cnpj).addEventListener('click', function () {
                var cnpj = doc2.data().cnpj;
                var doc_id = doc.id;
                sessionStorage.setItem("doc.id", doc_id);
                sessionStorage.setItem("last-cnpj", cnpj);
                window.location.href = '/painel/esta-painel.html';
              });

              document.getElementById("title" + doc2.data().cnpj).addEventListener('click', function () {
                var cnpj = doc2.data().cnpj;
                var doc_id = doc.id;
                sessionStorage.setItem("doc.id", doc_id);
                sessionStorage.setItem("last-cnpj", cnpj);
                window.location.href = '/painel/esta-painel.html';
              });

              if (status == true) {
                document.getElementById("on/off" + doc2.data().cnpj).style.color = 'green';
                document.getElementById("on/off" + doc2.data().cnpj).style.width = '35%';
                document.getElementById("on/off" + doc2.data().cnpj).setAttribute('value', 'Ativado');
              } else if (status == false) {
                document.getElementById("on/off" + doc2.data().cnpj).style.color = 'red';
                document.getElementById("on/off" + doc2.data().cnpj).style.width = '45%';
                document.getElementById("on/off" + doc2.data().cnpj).setAttribute('value', 'Desativado');
              }

            });

          });
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

