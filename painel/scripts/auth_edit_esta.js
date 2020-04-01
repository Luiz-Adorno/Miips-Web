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
    if (cnpj === null) {
      window.location.href = 'estabelecimentos.html';
    }
    cnpj_new = cnpj.replace("/", "-");
    console.log(cnpj_new);
    console.log(doc_id);

    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).get().then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());

        var nome_estabelecimentoF = doc.data().nome_estabelecimento;
        var estadoF = doc.data().estado;
        var cidadeF = doc.data().cidade;
        var ruaF = doc.data().rua;
        var url_photo = doc.data().profilePhoto;
        var nroF = doc.data().numero;
        var telF = doc.data().telefone;
        var cnpjF = doc.data().cnpj;
        var cepF = doc.data().cep;
        var bairroF = doc.data().bairro;
        var statusF = doc.data().state;
        var complementoF = doc.data().complemento;
        var statusF = doc.data().state;

        document.getElementById("avatar_big").src = url_photo;

        document.getElementById("nome_esta").value = nome_estabelecimentoF;
        document.getElementById("telefone").value = telF;
        document.getElementById("cnpj").value = cnpjF;
        document.getElementById("cep").value = cepF;
        document.getElementById("cidade").value = cidadeF;
        document.getElementById("uf").value = estadoF;
        document.getElementById("rua").value = ruaF;
        document.getElementById("bairro").value = bairroF;
        document.getElementById("nro").value = nroF;
        document.getElementById("cnpj").value = cnpjF;
        document.getElementById("complemento").value = complementoF;
        document.getElementById("status-id").value = statusF;
        document.getElementById("preloader").style.display = "none";

        const signupFormStore = document.querySelector('#register-form-store');

        signupFormStore.addEventListener('submit', (e) => {
          e.preventDefault();
          document.getElementById("preloader").style.display = "block";

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

          if (status == "true") {
            stated = true;
          } else {
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
            if (cepF == cep && cidadeF == cidade && estadoF == uf) {
              console.log("mesmo cep")
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
                db.collection('commercialPlaces').doc(cidade + "-" + uf).collection("Local").doc(cnpj_new).set({
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
                }, { merge: true }).then(function () {
                  console.log("second firestore add")
                  //after add the data in companies go to responsible
                  window.location.href = 'esta-painel.html';
                });

              });
            } else {
              var doc_id = sessionStorage.setItem("doc.id", cidade + "-" + uf);
              //delete the older's cidade+uf node
              db.collection('companies').doc(user.uid).collection('commercialPlace').doc(cidadeF + "-" + estadoF).collection("local").doc(cnpj_new).delete().then(function () {
                console.log("Document successfully deleted!");

                //set a field to validate the doc
                db.collection('commercialPlaces').doc(cidade + "-" + uf).set({ count: firebase.firestore.FieldValue.increment(1) }, { merge: true }).then(function () {
                  console.log("Document successfully updated!");

                  //decrease the count on both collecitons
                  db.collection('commercialPlaces').doc(cidadeF + "-" + estadoF).update({ count: firebase.firestore.FieldValue.increment(-1) })
                  db.collection('companies').doc(user.uid).collection('commercialPlace').doc(cidadeF + "-" + estadoF).update({ count: firebase.firestore.FieldValue.increment(-1) })

                  //them add the newest cidade+uf node
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
                    //increment the count on "companies" collection
                    db.collection('companies').doc(user.uid).collection('commercialPlace').doc(cidade + "-" + uf).set({ count: firebase.firestore.FieldValue.increment(1) }, { merge: true }).then(function () {

                      //delete the older's cidade+uf from "commercialPlaces" node
                      db.collection("commercialPlaces").doc(cidadeF + "-" + estadoF).collection("Local").doc(cnpj_new).delete().then(function () {
                        console.log("Document successfully deleted!");

                        //them add the newest cidade+uf on "commercialPlaces" node
                        db.collection('commercialPlaces').doc(cidade + "-" + uf).collection("Local").doc(cnpj_new).set({
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
                        }, { merge: true }).then(function () {
                          console.log("second firestore add")
                          //after add the data in companies go to responsible
                          window.location.href = 'esta-painel.html';
                        });

                      }).catch(function (error) {
                        console.error("Error removing document: ", error);
                      });

                    })
                      .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                        document.getElementById("preloader").style.display = "none";
                      });

                  });
                }).catch(function (error) {
                  console.error("Error removing document: ", error);
                });

              })
                .catch(function (error) {
                  // The document probably doesn't exist.
                  console.error("Error updating document: ", error);
                  document.getElementById("preloader").style.display = "none";
                });

            }

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


