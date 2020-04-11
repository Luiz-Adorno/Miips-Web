auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    console.log(email, uid);

    var docRef = db.collection("companies").doc(uid);

    docRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        const razao = doc.data().nome_social;
        const nome_empresa = doc.data().nome_empresa;
        const cnpj = doc.data().cnpj;
        const telefone = doc.data().telefone;
        const cep = doc.data().cep;
        const cidade = doc.data().cidade;
        const uf = doc.data().estado;
        const rua = doc.data().rua;
        const bairro = doc.data().bairro;
        const nro = doc.data().numero;
        const complemento = doc.data().complemento;


        //set the company data from firestore
        document.getElementById("razao").value = razao;
        document.getElementById("nome-empresa").value = nome_empresa;
        document.getElementById("cnpj").value = cnpj;
        document.getElementById("telefone").value = telefone;

        const signupFormStore = document.querySelector('#register-form-edit');

        signupFormStore.addEventListener('submit', (e) => {
          e.preventDefault();

          //saving company info
          const razao_s = signupFormStore['razao'].value;
          const nome_e = signupFormStore['nome-empresa'].value;
          const cnpj = signupFormStore['cnpj'].value;
          const telefone = signupFormStore['telefone'].value;

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
                db.collection("companies").doc(uid).set({
                  nome_social: razao_s,
                  nome_empresa: nome_e,
                  cnpj: cnpj,
                  telefone: telefone
                }).then(function () {
                  window.location.href = 'profile.html';
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



    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
    }
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

