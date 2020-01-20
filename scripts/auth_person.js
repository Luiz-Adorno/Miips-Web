//register company
const signupFormPerson = document.querySelector('#register-form-person');

const nome_em = localStorage.getItem('nome_empresa');

signupFormPerson.addEventListener('submit', (e) => {
    e.preventDefault();

    //saving person info
    const nome_completo = signupFormPerson['nome_completo'].value;
    const cpf = signupFormPerson['cpf'].value;
    const rg = signupFormPerson['rg'].value;
    const orgemissor = signupFormPerson['orgemissor'].value;


    db.collection('companies').doc(nome_em).collection('responsible').add({
       nome: nome_completo,
       cpf: cpf,
       rg: rg,
       orgao_emissor: orgemissor
    });

    setTimeout(function() {
        window.location.href = '/contract.html';
    }, 2000);
});

