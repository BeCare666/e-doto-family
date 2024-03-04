		
        // Récupérer l'ID du produit depuis l'URL
        const urlParams = new URLSearchParams(window.location.search);
        const productIdxxx = urlParams.get("card");
        const productIdyy = urlParams.get("category");

        if(productIdxxx){
            var myDivs = document.getElementById('monDivClick');
            myDivs.click()
        }
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
          var useremail = snapshot.val().email;
          var username = snapshot.val().username;
          var ABONNEMENT = snapshot.val().ABONNEMENT;
      
          var ABIDX = document.getElementById("userABID")
          var usernameID = document.getElementById("usernameID")

          const contentwx = snapshot.val().ABONNEMENT == false
          ? `Aucun abonnement `   
          : `<i class="zmdi zmdi-check-circle" style="font-size: 18px; color: green;"></i> Premium`;
          
          ABIDX.innerHTML = `
          <ul>
          <li  style="width: 35vh !important; text-overflow: ellipsis; overflow: hidden; white-space: nowrap;"><span class="icon"><i class="fa fa-envelope" aria-hidden="true"></i></span>${useremail}</li>
          <li><span class="icon"><i class="fas fa-handshake" aria-hidden="true"></i></span>${contentwx}</li>
          <li><span class="icon"><i class="fa fa-home" aria-hidden="true"></i></span>Allez à l'accueil</li>
          <li><span class="icon"><i class="fas fa-sign-out-alt" aria-hidden="true"></i></span>Deconnecter</li>
          <li><span class="icon"><i class="fas fa-trash" aria-hidden="true"></i></span>supprimer votre compte</li>
        </ul>          
          `
          usernameID.innerHTML = `${username} `
         document.getElementById("scheduleID").addEventListener('click', function(){
            if(snapshot.val().ABONNEMENT){
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
         } )                  
            // Récupérez les données des produits depuis Firebase
            const productRef = database.ref("infos");
            productRef.on("value", (snapshot) => {
                document.getElementById('sameToBody').style.display = "none"
                var UserMailMy = localStorage.getItem('userMailMy');          
                const productList = document.getElementById("product-list");
                productList.innerHTML = ""; // Effacez le contenu précédent
                snapshot.forEach((productSnapshot) => {
                    const productData = productSnapshot.val();
                   // var myCatory = productData.Category
                    if(!productIdyy){             
                        var photoDataUrl = 'data:image/png;base64,' + productData.RollNo;
                        //var BreadcrumbId = document.getElementById('breadcrumbId');
                        //BreadcrumbId.innerHTML = `${myCatory} `  
                        // Générez le HTML pour chaque produit
                        const productHTML = `
                        <div class="col-sm-6 col-md-4 col-lg-4 p-b-35 isotope-item women" >
                        <!-- Block2 -->
                        <div class="block2" style="background-color: #33333309 !important;  padding: 1vh;">
                            <div class="block2-pic hov-img0" >
                                <img src="${photoDataUrl}" alt="IMG-PRODUCT"  style="height: 50vh !important; width: 100% !important;">
                                <a href="info_details.html?id=${productData.Idproduct}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                 Details  
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l item-title">
                                    <a href="info_details.html?id=${productData.Idproduct}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${productData.NameOfstd}
                                    </a>

                                    <!-----
                                    <span class="stext-105 cl3">
                                        $${productData.Prix}
                                    </span>
                                    ---->
                                </div>

                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a style="cursor:pointer;" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" onclick="addToCart( '${productData.NameOfstd}')">
                                    <i class="zmdi zmdi-favorite" style="font-size: 26px;"></i>
                                        <!-----
                                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                        ---->
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>    
                        `;
        
                        productList.innerHTML += productHTML; 
                         //const productId = productSnapshot.key;
                    }else{
                        if(productIdyy === productData.Category){
                            var photoDataUrl = 'data:image/png;base64,' + productData.RollNo;
                        //var BreadcrumbId = document.getElementById('breadcrumbId');
                        //BreadcrumbId.innerHTML = `${myCatory} `  
                        // Générez le HTML pour chaque produit
                        
                        const productHTML = `
                        <div class="col-sm-6 col-md-4 col-lg-3 p-b-35 isotope-item women" >
                        <!-- Block2 -->
                        <div class="block2" style="background-color: #33333309 !important;  padding: 1vh;">
                            <div class="block2-pic hov-img0" >
                                <img src="${photoDataUrl}" alt="IMG-PRODUCT"  style="height: 50vh !important; width: 100% !important;">
                                <a href="info_details.html?id=${productData.Idproduct}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                 Details  
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l item-title">
                                    <a href="info_details.html?id=${productData.Idproduct}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${productData.NameOfstd}
                                    </a>
                                    <!-----
                                    <span class="stext-105 cl3">
                                        $${productData.Prix}
                                    </span>
                                    ---->
                                </div>

                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a style="cursor:pointer;" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" onclick="addToCart(' '${productData.NameOfstd}')">
                                    <i class="zmdi zmdi-favorite" style="font-size: 26px;"></i>
                                        <!-----
                                        <img class="icon-heart1 dis-block trans-04" src="images/icons/icon-heart-01.png" alt="ICON">
                                        <img class="icon-heart2 dis-block trans-04 ab-t-l" src="images/icons/icon-heart-02.png" alt="ICON">
                                        ---->
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>    
                        `;
        
                        productList.innerHTML += productHTML; 
                         //const productId = productSnapshot.key;
                        }
                    }
                  
  
                });
            });
        
        }  
    
    })
        }else{
            window.location.href = "./auth0/login.html"
        }
    
    })
        function addToCart( productName){
            swal({
                title: productName,
                text: `Vous avez aimé ${productName}`,
                icon: "success",
                closeOnClickOutside: false,
        })
        }
        // Sélectionnez l'élément d'entrée de recherche par son ID
        var searchInput = document.getElementById('orderby1');

        // Écoutez l'événement d'entrée utilisateur dans l'input
        searchInput.addEventListener("input", function () {
            const searchTerm = searchInput.value.toLowerCase(); // Obtenez le terme de recherche en minuscules

            // Récupérez tous les éléments produits
            const products = document.querySelectorAll(".isotope-item");
            // Parcourez les produits et filtrez-les en fonction du terme de recherche
            products.forEach((product) => {
                const productName = product.querySelector(".item-title a").textContent.toLowerCase();
                if (productName.includes(searchTerm)) {
                    product.style.display = "block"; // Affichez le produit s'il correspond au terme de recherche
                } else {
                    product.style.display = "none"; // Masquez le produit s'il ne correspond pas
                }
            });
        });