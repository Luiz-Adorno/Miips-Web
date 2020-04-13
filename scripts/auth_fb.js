auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.

    if (arr0.length == 1) {
        //only have products registered
      if (arr0[0] == "Produto") {
        //add the categories data on user db
        db.collection('companies').doc(user.uid).set({
          category: arr0,
          product_category: arr,
        }, { merge: true }).then(function () {
          //after add the responsible in companies values go to painel
          window.location.href = '/register.html';
        });

      } 
        //only have services registered
        else if (arr0[0] == "Serviço") {
        //add the categories data on user db
        db.collection('companies').doc(user.uid).set({
          category: arr0,
          service_category: arr2
        }, { merge: true }).then(function () {
          //after add the responsible in companies values go to painel
          window.location.href = '/register.html';
        });

      }
    }//have both registered
    else if (arr0.length == 2) {
      //add the categories data on user db
      db.collection('companies').doc(user.uid).set({
        category: arr0,
        product_category: arr,
        service_category: arr2
      }, { merge: true }).then(function () {
        //after add the responsible in companies values go to painel
        window.location.href = '/register.html';
      });

    }

  } else {
    // User is signed out.
    // ...
  }
});

//listener the seleck picker category to create/destroy option selected
let arr0 = new Array();
const showSelectedOptionsCategory = options => {
  arr0 = [...options].filter(o => o.selected).map(o => o.value);
  var i;
  for (i = 0; i < arr0.length; i++) {
    if (arr0[i] === "Produto") {
      document.getElementById("product-display").style.display = "block";
    } else if (arr0[i] == "Serviço") {
      document.getElementById("service-display").style.display = "block";
    }
  }
  if (arr0.length == 1) {
    if (arr0[0] == "Produto") {
      document.getElementById("service-display").style.display = "none";
    } else if (arr0[0] == "Serviço") {
      document.getElementById("product-display").style.display = "none";
    }
  }
  else if (arr0.length == 0) {
    document.getElementById("service-display").style.display = "none";
    document.getElementById("product-display").style.display = "none";
  }

}

let arr = new Array();
let arr2 = new Array();
const showSelectedOptions = options => {
  arr = [...options].filter(o => o.selected).map(o => o.value);
  console.log(arr);
}

const showSelectedOptions2 = options => {
  arr2 = [...options].filter(o => o.selected).map(o => o.value);
 // console.log(arr2.length)
}

const singupfbauth = document.querySelector('#register-form');

singupfbauth.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = singupfbauth['email'].value;
  const password1 = singupfbauth['password1'].value;
  const password2 = singupfbauth['password2'].value;

  if (document.getElementById('cash').checked) {
    // If password not entered 
    if (password1 == '')
      alert("Por favor digite uma senha");

    // If confirm password not entered 
    else if (password2 == '')
      alert("Por favor confirme sua senha");

    // If Not same return False.     
    else if (password1 != password2) {
      alert("\nSenhas diferentes, tente novamente")
      return false;
    }

    //if are less than 6 char
    else if (password1.length < 6 || password2.length < 6) {
      alert("\nA senha deve conter no mínimo 6 caracteres")
      return false;
    }

    else if (arr0.length == 2 && arr.length == 0) {
      alert("\nPor favor selecione a(s) categorias de Produto")
      return false;
    }
    else if (arr0.length == 2 && arr2.length == 0) {
      alert("\nPor favor selecione a(s) categorias de Serviço")
      return false;
    }

    else {
      document.getElementById("preloader").style.display = "block";
      auth.createUserWithEmailAndPassword(email, password1).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert("\nEmail ja utilizado, por favor entre em contato com a equipe de suporte")
        // ...
      });

    }
  } else {
    alert("É necessário aceitar os termos de uso e condição")
  }



})
