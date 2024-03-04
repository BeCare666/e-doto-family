		
        // Récupérer l'ID du produit depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const productIdxxx = urlParams.get("id");
        // Récupérez une référence à la base de données Firebase
        const firebaseConfig = {
            apiKey: "AIzaSyBdncSQelmFoSYFShX4SXm8lVrPaWeLGzA",
            authDomain: "e-doto.firebaseapp.com",
            databaseURL: "https://e-doto-default-rtdb.firebaseio.com",
            projectId: "e-doto",
            storageBucket: "e-doto.appspot.com",
            messagingSenderId: "153793942595",
            appId: "1:153793942595:web:158753b614bf87faaef0f6"
            };
            firebase.initializeApp(firebaseConfig);
            const database = firebase.database();
            var tableOfPrice = []
            var tableEmail = []
            firebase.auth().onAuthStateChanged(function(user) { 
                if(user){
                var userId = user.uid;
                var useremail = user.email;
                tableEmail.push(useremail)
                const userRef = database.ref(`/utilisateurs/${userId}`);
                userRef.once("value")
                .then((snapshot) => {
                if (!snapshot.exists()) {
                    document.getElementById('sameToBody').style.display = "none"
                    Swal.fire({
                        title: "Votre nom d'utilisateur",
                        input: 'text',
                        inputAttributes: {
                          autocapitalize: 'off'
                        },
                        showCancelButton: false,
                        confirmButtonText: "Envoyer",
                        showLoaderOnConfirm: true,
                        allowOutsideClick: false,
                        confirmButtonColor: '#3085d6',
                        preConfirm: (username) => {
                          if (username) {                         
                            let timerInterval;
                            Swal.fire({
                            title: "Finalisatin de vte cmpte",
                            html: "Votre compte sera finalisé au plus dans  <b></b> milliseconds.",
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading();
                                const timer = Swal.getPopup().querySelector("b");
                                timerInterval = setInterval(() => {
                                timer.textContent = `${Swal.getTimerLeft()}`;
                                }, 1000);
                            },
                            willClose: () => {
                                clearInterval(timerInterval);
                            }
                            }).then((result) => {
                            /* Read more about handling dismissals below */
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                            });

                            firebase.database().ref('utilisateurs/' + userId).set({
                            userId : userId,
                            email: tableEmail[0],
                            username : username,
                            ABONNEMENT : false,                            
                            }).then(() => {  
                            swal({
                            title: "Félicitations",
                            text: "Votre a été finalisé!",
                            icon: "success",
                            closeOnClickOutside: false,
                            })
                            }).catch((error)=>{
                            swal({
                            title: "Erreur ",
                            text: "il y a une erreur ",
                            icon: "error",
                            closeOnClickOutside: false,
                            })
                            })
                          }else {
                            Swal.showValidationMessage("Veuillez saisir quelque chose.");
                          }
                        }
                  }).then((result)=>{
                  if(result.isConfirmed){
                   // window.location.href = "./login/end.html"
                  }
                  })
        }else{
            // Récupérez les données des produits depuis Firebase
            const productRef = database.ref(`infos/${productIdxxx}`);
            productRef.on("value", (snapshot) => {
                document.getElementById('sameToBody').style.display = "none"
                //var UserMailMy = localStorage.getItem('userMailMy'); 
                const productData = snapshot.val(); 
                console.log(productData)        
                const headerInfoID = document.getElementById("headerInfoID");
                const hov_img0Id = document.getElementById("hov-img0Id");
                const mtextIdVal = document.getElementById("mtextId");
                const infodetailsId = document.getElementById("infodetailsId");
                   
                    //console.log(productData)
                    var photoDataUrl = 'data:image/png;base64,' + snapshot.val().RollNo;
                    var photoDataUrlx = 'data:image/png;base64,' + snapshot.val().RollNoX;
                   // var myCatory = productData.Category

                   headerInfoID.innerHTML = `
                   <section class="" style="margin: top 0!important; padding: 0 !important;">
                   <img src="${photoDataUrl}" alt="" style="height: 100vh !important; width: 100% !important;">
                   <h2 class="ltext-105 cl0 txt-center">
                  <!-- ${snapshot.val().Category}-->
                   </h2>
                   </section>	
                   `
                   mtextIdVal.innerHTML = ` ${snapshot.val().NameOfstd}`
                   hov_img0Id.innerHTML = `<img src="${photoDataUrlx}" alt="IMG">`

                   infodetailsId.innerHTML = `${snapshot.val().Genboxtextarea}`
            });


            var useremail = snapshot.val().email;
            var username = snapshot.val().username;
           document.getElementById("scheduleID").addEventListener('click', function(){
              if(!snapshot.val().ABONNEMENT){
                  window.location.href = "./rdv/rdv.html"
                  var valPassschedule = "MDlEKNDCKKH2345kfgEE" 
                  localStorage.setItem("passIdschedule", valPassschedule)
                  localStorage.setItem("theValeemail", useremail)
                  localStorage.setItem("theValelname", username)
              }else{
                  swal({
                  title: "Désolé",
                  text: "Vous n'êtes pas abonné",
                  icon: "info",
                  closeOnClickOutside: false,
                  })
              }
           })     
        }  
    
    })
        }else{
            window.location.href = "./auth0/login.html"
        }
    
    })
