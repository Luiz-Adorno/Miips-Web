let arr = new Array();
let arr1 = new Array();
let arr2 = new Array();

auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    var refe = db.collection("companies").doc(user.uid);

    //get the categories from db and set value in the select
    refe.get().then(function (doc) {
      if (doc.exists) {
        document.getElementById("preloader").style.display = "none";
        let cate = new Array();
        let cateP = new Array();
        let cateS = new Array();
        cate = doc.data().category;

        //associa o valor do arr do select para os valores do bd
        arr = cate;

        var values = cate.toString();
        console.log(values)
        $.each(values.split(","), function (i, e) {
          $("#number-multiple option[value='" + e + "']").prop("selected", true);
        });
        let element = document.getElementById("catego");
        element.innerHTML = cate;

        if (cate.length == 2) {
          cateP = doc.data().product_category;
          cateS = doc.data().service_category;
          //associa os valores de arr1 e arr2 do select para os valores do bd
          arr1 = cateP;
          arr2 = cateS;

          document.getElementById("product-display").style.display = "block";
          document.getElementById("service-display").style.display = "block";

          var valuesP = cateP.toString();
          var valuesS = cateS.toString();

          $.each(valuesP.split(","), function (i, e) {
            $("#product-name option[value='" + e + "']").prop("selected", true);
          });

          $.each(valuesS.split(","), function (i, e) {
            $("#service-name option[value='" + e + "']").prop("selected", true);
          });
        }
        else {
          if (cate[0] == "Produto") {
            cateP = doc.data().product_category;
            document.getElementById("product-display").style.display = "block";
            //associa o valor de arr1 do select para os valores do bd
            arr1 = cateP;

            var valuesP = cateP.toString();

            $.each(valuesP.split(","), function (i, e) {
              $("#product-name option[value='" + e + "']").prop("selected", true);
            });

          } else {
            document.getElementById("service-display").style.display = "block";
            cateS = doc.data().service_category;
            var valuesS = cateS.toString();
            //associa o  valor de arr2 do select para os valores do bd
            arr2 = cateS;

            $.each(valuesS.split(","), function (i, e) {
              $("#service-name option[value='" + e + "']").prop("selected", true);
            });
          }

        }
      }
    }).catch(function (error) {
      console.log("Error getting document:", error);
      document.getElementById("preloader").style.display = "none";
    });

    //btn event listener
    singupfbauth.addEventListener('submit', (e) => {
      e.preventDefault();
    
     // console.log(arr.length)
    
      if (arr.length == 2) {
        if (arr1.length == 0 || arr2.length == 0) {
          alert("\nPor favor selecione a(s) categorias de Produto e Serviço")
        } else {
    
          db.collection('companies').doc(user.uid).set({
            category: arr,
            product_category: arr1,
            service_category: arr2
          }, { merge: true }).then(function () {
            //after add the responsible in companies values go to painel
            window.location.href = '/painel/profile.html';
          });
    
        }
      } else {
        if (arr[0] == "Produto") {
          if (arr1.length == 0) {
            alert("\nPor favor selecione a(s) categorias de Produto")
          } else {
            db.collection('companies').doc(user.uid).set({
              category: arr,
              product_category: arr1,
              service_category: firebase.firestore.FieldValue.delete()
            }, { merge: true }).then(function () {
              //after add the responsible in companies values go to painel
              window.location.href = '/painel/profile.html';
            });
          }
    
        } else {
          if (arr2.length == 0) {
            alert("\nPor favor selecione a(s) categorias de Serviço")
          } else {
            db.collection('companies').doc(user.uid).set({
              category: arr,
              product_category: firebase.firestore.FieldValue.delete(),
              service_category: arr2
            }, { merge: true }).then(function () {
              //after add the responsible in companies values go to painel
              window.location.href = '/painel/profile.html';
            });
          }
    
        }
      }
    
    })

  } else {
    // User is signed out.
    // ...
  }
});

//logic to hide and show each catgory selected

const showSelectedOptionsCategory = options => {
  arr = [...options].filter(o => o.selected).map(o => o.value);
  let element = document.getElementById("catego");
  element.innerHTML = arr;
  if (arr.length == 2) {
    document.getElementById("product-display").style.display = "block";
    document.getElementById("service-display").style.display = "block";
  } else if (arr.length == 1) {
    if (arr[0] == "Produto") {
      document.getElementById("product-display").style.display = "block";
      document.getElementById("service-display").style.display = "none";
    } else {
      document.getElementById("product-display").style.display = "none";
      document.getElementById("service-display").style.display = "block";
    }
  } else {
    document.getElementById("product-display").style.display = "none";
    document.getElementById("service-display").style.display = "none";
  }
}

const showSelectedOptions = options => {
  arr1 = [...options].filter(o => o.selected).map(o => o.value);
  //console.log(arr1)
}

const showSelectedOptions2 = options => {
  arr2 = [...options].filter(o => o.selected).map(o => o.value);
  //console.log(arr2)
}
const singupfbauth = document.querySelector('#register-form');


