auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var email = user.email;
    var uid = user.uid;
    console.log(email, uid);

    var docRef = db.collection("companies").doc(uid);

    db.collection("companies").doc(user.uid).collection('responsible').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        // doc.data() is never undefined for query doc snapshots
        const responsible = doc.id;

        db.collection("companies").doc(user.uid).collection('responsible').doc(responsible).get().then(function (doc_responsible) {
          const nome_completo = doc_responsible.data().nome;
          const cpf = doc_responsible.data().cpf;
          const rg = doc_responsible.data().rg;
          const orgao_emissor = doc_responsible.data().orgao_emissor;

          //set the data from firestore
          document.getElementById("nome_completo").innerHTML = nome_completo;
          document.getElementById("cpf").innerHTML = cpf;
          document.getElementById("rg").innerHTML = rg;
          document.getElementById("orgao_emissor").innerHTML = orgao_emissor;
        });

      });
    });

    docRef.get().then(function (doc) {
      if (doc.exists) {

        console.log("Document data:", doc.data());
        const nome_social = doc.data().nome_social;
        const nome_empresa = doc.data().nome_empresa;
        const cnpj = doc.data().cnpj;
        const telefone = doc.data().telefone;

        //set the company data from firestore
        document.getElementById("nome-empresa").innerHTML = nome_empresa;
        document.getElementById("nome-social").innerHTML = nome_social;
        document.getElementById("email").innerHTML = user.email;
        document.getElementById("cnpj").innerHTML = cnpj;
        document.getElementById("telefone").innerHTML = telefone;

      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
    });



    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
      document.getElementById('avatar_big').src = user.photoURL
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

