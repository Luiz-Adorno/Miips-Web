//register company
const signupFormPerson = document.querySelector('#register-form-person');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);

    signupFormPerson.addEventListener('submit', (e) => {
      e.preventDefault();

      //saving person info
      const nome_completo = signupFormPerson['nome_completo'].value;
      const cpf = signupFormPerson['cpf'].value;
      const rg = signupFormPerson['rg'].value;
      const orgemissor = signupFormPerson['orgemissor'].value;

      var docData = {
        nome: nome_completo,
        cpf: cpf,
        rg: rg,
        orgao_emissor: orgemissor
      };


      db.collection('companies').doc(user.uid).collection('responsible').add(docData).then(function () {
        db.collection("companies").doc(user.uid).collection('responsible').get().then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());

            //add in companies data the reponsible id
            db.collection('companies').doc(user.uid).set({
              responsible: doc.id
            }, { merge: true }).then(function() {
              //after add the responsible in companies values go to painel
              window.location.href = '/painel/index.html';
          });

          }); 
        });
      });

    });
  } else {

    // User not logged in or has just logged out.

  }
});


