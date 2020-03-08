//register company
const signupFormCompany = document.querySelector('#register-form-company');

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User logged in already or has just logged in.
    console.log(user.uid);

    signupFormCompany.addEventListener('submit', (e) => {
      e.preventDefault();

      //saving company info
      const nome_social = signupFormCompany['nome_social'].value;
      const nome_empresa = signupFormCompany['nome_empresa'].value;
      const cnpj = signupFormCompany['cnpj'].value;
      const telefone = signupFormCompany['telefone'].value;

      if (cnpj.length < 14) {
        alert("\nCnpj deve conter no mínimo 14 caracteres")
        return false;
      } else if (telefone.length < 8) {
        alert("\nTelefone deve conter no mínimo 8 caracteres")
      } else {
        db.collection('companies').doc(user.uid).set({
          nome_social: nome_social,
          nome_empresa: nome_empresa,
          cnpj: cnpj,
          telefone: telefone,
        }, { merge: true }).then(function () {
          //after add the data in companies go to responsible
          window.location.href = '/register-person.html';
          console.log(cep)
        });
      }

    });

  } else {
    // User not logged in or has just logged out.
  }
});

