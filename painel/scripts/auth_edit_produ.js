auth.onAuthStateChanged(function (user) {
  if (user) {
    // User is signed in.
    console.log('logged');
    if (user.photoURL != null) {
      document.getElementById('avatar_small').src = user.photoURL
    }
    // ...
    var cnpj = sessionStorage.getItem("last-cnpj");
    if (cnpj === null) {
      window.location.href = 'estabelecimentos.html';
    }
    var doc_id = sessionStorage.getItem("doc.id");
    var barcode = sessionStorage.getItem("codebar");
    cnpj_new = cnpj.replace("/", "-");

    db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local")
      .doc(cnpj_new).collection("Products").doc(barcode).get().then(function (doc) {
        if (doc.exists) {
          //console.log("Document data:", doc.data());

          var name_prod = doc.data().nome_produto;
          var codebar = doc.data().cod_barras;
          var status = doc.data().state;
          var price = doc.data().valor;
          var qnt = doc.data().quantidade;
          var url_photo = doc.data().url_product;
          var date = doc.data().data_cadastro;
          var descri = doc.data().descri;
          var gender = doc.data().gender;
          var cate = doc.data().product_category;
          var size = doc.data().size;

          document.getElementById("selectCat").value = cate;
          document.getElementById("selectpicker").value = gender;
          document.getElementById("status-id").value = status;
          document.getElementById("avatar_big").src = url_photo;
          document.getElementById("date").value = date;
          document.getElementById("name_prod").value = name_prod;
          document.getElementById("myInput").value = price;
          document.getElementById("myInput3").value = codebar;
          document.getElementById("myInput2").value = qnt;
          document.getElementById("descri").value = descri;

          document.getElementById("preloader").style.display = "none";

          if (cate === "Vestuário") {
            $('#selectTam').val(size);
            document.getElementById('selectTamDiv').style.display = 'block';  // to display
            document.getElementById('selectTamNume').style.display = 'none';
          }
          else if (cate === "Calçado") {
            $('#selectNume').val(size);
            document.getElementById('selectTamNume').style.display = 'block';  // to display
            document.getElementById('selectTamDiv').style.display = 'none';
          } else {
            document.getElementById('selectTamNume').style.display = 'none';
            document.getElementById('selectTamDiv').style.display = 'none';
          }

        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      }).catch(function (error) {
        console.log("Error getting document:", error);
      });

    $("#selectCat").change(function () {
      if (this.value === "Vestuário") {
        document.getElementById('selectTamDiv').style.display = 'block';  // to display
        document.getElementById('selectTamNume').style.display = 'none';
      }
      else if (this.value === "Calçado") {
        document.getElementById('selectTamNume').style.display = 'block';  // to display
        document.getElementById('selectTamDiv').style.display = 'none';
      } else {
        document.getElementById('selectTamNume').style.display = 'none';
        document.getElementById('selectTamDiv').style.display = 'none';
      }
    });

    const signupFormStore = document.querySelector('#register-form-store');

    signupFormStore.addEventListener('submit', (e) => {
      e.preventDefault();

      const statusF = signupFormStore['status-id'].value;
      const name_prodF = signupFormStore['name_prod'].value;
      const priceF = signupFormStore['myInput'].value;
      const descriF = signupFormStore['descri'].value;
      const qntF = signupFormStore['myInput2'].value;
      const genderF = signupFormStore['selectpicker'].value;
      const cateF = signupFormStore['selectCat'].value;

      //transform 01 in 1, 001 in 1, etc... 
      qnt_new = qntF.replace(/^0+/, "");

      var stated;

      if (statusF == "true") {
        stated = true;
      } else {
        stated = false;
      }


      if (priceF == "0,00") {
        alert("\nDigite o valor do produto")
        return false;
      } else if (qnt_new == 0) {
        alert("\nDigite a quantidade do produto em estoque")
      }
      else {
        if (cateF === "Vestuário") {
          if (!$('#selectTam').val()) {
            document.getElementById("preloader").style.display = "none";
            alert("\nSelecione os tamanhos disponíveis pra esse vestuário ")
          } else {
            document.getElementById("preloader").style.display = "block";
            var selectSize = $('#selectTam').val();

            db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).collection("Products")
              .doc(barcode).set({
                product_category: cateF,
                size: selectSize,
                gender: genderF,
                nome_produto: name_prodF,
                state: stated,
                quantidade: qnt_new,
                valor: priceF,
                descri: descriF
              }, { merge: true }).then(function () {
                db.collection("commercialPlaces").doc(doc_id).collection("Product").where("cod_barras", "==", barcode)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      // doc.data() is never undefined for query doc snapshots
                      if (doc.data().cnpj_owner == cnpj) {
                        //console.log(doc.id, " => ", doc.data());
                        db.collection("commercialPlaces").doc(doc_id).collection("Product").doc(doc.id).set({
                          product_category: cateF,
                          gender: genderF,
                          size: selectSize,
                          nome_produto: name_prodF,
                          state: stated,
                          quantidade: qnt_new,
                          valor: priceF,
                          descri: descriF
                        }, { merge: true }).then(function () {
                          document.getElementById("preloader").style.display = "none";
                          //after add the  go to responsible
                          window.location.href = 'products.html';
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

        } else if (cateF === "Calçado") {
          if (!$('#selectNume').val()) {
            document.getElementById("preloader").style.display = "none";
            alert("\nSelecione os tamanhos disponíveis pra esse calçado ")
          } else {
            var selectSize = $('#selectNume').val();
            document.getElementById("preloader").style.display = "block";

            db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).collection("Products")
              .doc(barcode).set({
                product_category: cateF,
                gender: genderF,
                size: selectSize,
                nome_produto: name_prodF,
                state: stated,
                quantidade: qnt_new,
                valor: priceF,
                descri: descriF
              }, { merge: true }).then(function () {
                db.collection("commercialPlaces").doc(doc_id).collection("Product").where("cod_barras", "==", barcode)
                  .get()
                  .then(function (querySnapshot) {
                    querySnapshot.forEach(function (doc) {
                      // doc.data() is never undefined for query doc snapshots
                      if (doc.data().cnpj_owner == cnpj) {
                        //console.log(doc.id, " => ", doc.data());
                        db.collection("commercialPlaces").doc(doc_id).collection("Product").doc(doc.id).set({
                          product_category: cateF,
                          gender: genderF,
                          size: selectSize,
                          nome_produto: name_prodF,
                          state: stated,
                          quantidade: qnt_new,
                          valor: priceF,
                          descri: descriF
                        }, { merge: true }).then(function () {
                          document.getElementById("preloader").style.display = "none";
                          //after add the  go to responsible
                          window.location.href = 'products.html';
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
        } else {
          document.getElementById("preloader").style.display = "block";
          db.collection("companies").doc(user.uid).collection("commercialPlace").doc(doc_id).collection("local").doc(cnpj_new).collection("Products")
            .doc(barcode).set({
              product_category: cateF,
              gender: genderF,
              nome_produto: name_prodF,
              state: stated,
              quantidade: qnt_new,
              valor: priceF,
              descri: descriF
            }, { merge: true }).then(function () {
              db.collection("commercialPlaces").doc(doc_id).collection("Product").where("cod_barras", "==", barcode)
                .get()
                .then(function (querySnapshot) {
                  querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    if (doc.data().cnpj_owner == cnpj) {
                      //console.log(doc.id, " => ", doc.data());
                      db.collection("commercialPlaces").doc(doc_id).collection("Product").doc(doc.id).set({
                        product_category: cateF,
                        gender: genderF,
                        nome_produto: name_prodF,
                        state: stated,
                        quantidade: qnt_new,
                        valor: priceF,
                        descri: descriF
                      }, { merge: true }).then(function () {
                        document.getElementById("preloader").style.display = "none";
                        //after add the  go to responsible
                        window.location.href = 'products.html';
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


