auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
    }
    // ...
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
        var nro = doc.data().numero;
        var tel = doc.data().telefone;
        var cnpj = doc.data().cnpj;
        var cep = doc.data().cep;
        var bairro = doc.data().bairro;
        var status = doc.data().state;
        var complemento = doc.data().complemento;
        var status = doc.data().state;

        document.getElementById("avatar_big").src = url_photo;

        document.getElementById("nome_esta").value = nome_estabelecimento;
        document.getElementById("telefone").value = tel;
        document.getElementById("cnpj").value = cnpj;
        document.getElementById("cep").value = cep;
        document.getElementById("cidade").value = cidade;
        document.getElementById("uf").value = estado;
        document.getElementById("rua").value = rua;
        document.getElementById("bairro").value = bairro;
        document.getElementById("nro").value = nro;
        document.getElementById("cnpj").value = cnpj;
        document.getElementById("complemento").value = complemento;
        document.getElementById("status-id").value = status;

        const signupFormStore = document.querySelector('#register-form-store');

        signupFormStore.addEventListener('submit', (e) => {
          e.preventDefault();


          //saving company info
          const nome_esta = signupFormStore['nome_esta'].value;
          var cnpj = signupFormStore['cnpj'].value;
          const telefone = signupFormStore['telefone'].value;
          const cep = signupFormStore['cep'].value;
          const cidade = signupFormStore['cidade'].value;
          const uf = signupFormStore['uf'].value;
          const rua = signupFormStore['rua'].value;
          const bairro = signupFormStore['bairro'].value;
          const nro = signupFormStore['nro'].value;
          const complemento = signupFormStore['complemento'].value;
          const status = signupFormStore['status-id'].value;

          var stated;

          if(status == "true"){
            stated = true;
          }else{
            stated = false;
          }

          //firebasefirestore doens't accept "/"
          cnpj_new = cnpj.replace("/", "-");


          if (cnpj.length < 14) {
            alert("\nCnpj deve conter no mínimo 14 caracteres")
            return false;
          } else if (telefone.length < 8) {
            alert("\nTelefone deve conter no mínimo 8 caracteres")
          } else {
            firebase.auth().onAuthStateChanged(function (user) {
              if (user) {
                db.collection('companies').doc(user.uid).collection('commercialPlace').doc(cidade + "-" + uf).collection("local").doc(cnpj_new).set({
                  state: stated,
                  nome_estabelecimento: nome_esta,
                  cnpj: cnpj,
                  telefone: telefone,
                  cep: cep,
                  cidade: cidade,
                  estado: uf,
                  rua: rua,
                  bairro: bairro,
                  profilePhoto: url_photo,
                  numero: nro,
                  complemento: complemento
                }).then(function () {
                  window.location.href = 'esta-painel.html';
                });
              } else {
                // No user is signed in.
              }
            });
          }

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


