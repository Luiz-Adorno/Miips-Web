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
    cnpj_new = cnpj.replace("/", "-");

    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local")
      .doc(cnpj_new).collection("Services").doc(idCode).get().then(function (doc) {
        if (doc.exists) {
          //console.log("Document data:", doc.data());

          var url_photo = doc.data().url_service;
          var nameS = doc.data().nome_serviço;
          var time = doc.data().time;
          var status = doc.data().state;
          var price = doc.data().valor;
          var date = doc.data().data_cadastro;
          var descri = doc.data().descri;

          document.getElementById("status-id").value = status;
          document.getElementById("avatar_big").src = url_photo;
          document.getElementById("date").value = date;
          document.getElementById("name_serv").value = nameS;
          document.getElementById("myInput").value = price;
          document.getElementById("myInput3").value = idCode;
          document.getElementById("time").value = time;
          document.getElementById("descri").value = descri;

          document.getElementById("preloader").style.display = "none";
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });


    const signupFormStore = document.querySelector('#register-form-store');

    signupFormStore.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusF = signupFormStore['status-id'].value;
      //saving company info
      const nameS = signupFormStore['name_serv'].value;
      const time = signupFormStore['time'].value
      //console.log(time)
      const price = signupFormStore['myInput'].value
      const descrip = signupFormStore['descri'].value

      var stated;

      if (statusF == "true") {
        stated = true;
      } else {
        stated = false;
      }

      if (price == "0,00") {
        alert("\nDigite o valor do produto")
        return false;
      }
      else {
        document.getElementById("preloader").style.display = "block";

        db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).collection("Services")
          .doc(idCode).set({
            state: stated,
            nome_serviço: nameS,
            time: time,
            valor: price,
            descri: descrip
          }, { merge: true }).then(function () {
            db.collection("commercialPlaces").doc(doc_id).collection("Service").where("id_cod", "==", idCode)
              .get()
              .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                  // doc.data() is never undefined for query doc snapshots
                  if (doc.data().cnpj_owner == cnpj) {
                    //console.log(doc.id, " => ", doc.data());
                    db.collection("commercialPlaces").doc(doc_id).collection("Service").doc(doc.id).set({
                      state: stated,
                      nome_serviço: nameS,
                      time: time,
                      valor: price,
                      descri: descrip
                    }, { merge: true }).then(function () {
                      document.getElementById("preloader").style.display = "none";
                      //after add the  go to responsible
                      window.location.href = 'serv_painel.html';
                    }).catch(function (error) {
                      console.log("Error getting document:", error);
                      document.getElementById("preloader").style.display = "none";
                    });
                  }
                });
              })
              .catch(function (error) {
                console.log("Error getting documents: ", error);
              });
          }).catch(function (error) {
            console.log("Error getting document:", error);
            document.getElementById("preloader").style.display = "none";
          });
      }
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


