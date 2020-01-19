//register company
const signupFormCompany = document.querySelector('#register-form-company');

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
 
    db.collection('companies').doc(nome_empresa).set({
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
    }, {merge: true});

   /* db.collection('companies').doc(nome_empresa).collection('products').add({
        cadeira: "hyperX"
    })*/

    setTimeout(function() {
        window.location.href = '/register-person.html';
    }, 2000);

});

