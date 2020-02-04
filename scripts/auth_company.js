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
        const cep = signupFormCompany['cep'].value;
        const cidade = signupFormCompany['cidade'].value;
        const uf = signupFormCompany['uf'].value;
        const rua = signupFormCompany['rua'].value;
        const bairro = signupFormCompany['bairro'].value;
        const nro = signupFormCompany['nro'].value;
        const complemento = signupFormCompany['complemento'].value;

        db.collection('companies').doc(user.uid).set({
          nome_social: nome_social,
          nome_empresa: nome_empresa,
          cnpj: cnpj,
          telefone: telefone,
          cep: cep,
          cidade: cidade,
          estado: uf,
          rua: rua,
          bairro: bairro,
          numero: nro,
          complemento: complemento
      }, {merge: true}).then(function() {
        //after add the data in companies go to responsible
        window.location.href = '/register-person.html';
    });
    
    });

    } else {
      // User not logged in or has just logged out.
    }
  });

