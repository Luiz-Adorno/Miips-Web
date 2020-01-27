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
    
    
        db.collection('companies').doc(user.uid).collection('responsible').add({
           nome: nome_completo,
           cpf: cpf,
           rg: rg,
           orgao_emissor: orgemissor
        });
    
        setTimeout(function() {
            window.location.href = '/painel/index.html';
        }, 2000);

    });
    } else {

      // User not logged in or has just logged out.

    }
  });


