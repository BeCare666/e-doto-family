		
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
            apiKey: "AIzaSyBDaSON8rBJqUJeEZOKK5RpcyUJyTqbsgA",
            authDomain: "saop-dc3ab.firebaseapp.com",
            databaseURL: "https://saop-dc3ab-default-rtdb.firebaseio.com",
            projectId: "saop-dc3ab",
            storageBucket: "saop-dc3ab.appspot.com",
            messagingSenderId: "134982812869",
            appId: "1:134982812869:web:6d516188e73ed72a111cac"
        };
            firebase.initializeApp(firebaseConfig);
            const database = firebase.database();
            var tableOfPrice = []
            // Récupérez les données des produits depuis Firebase
            const productRef = database.ref("Thedatas");
            productRef.on("value", (snapshot) => {
                document.getElementById('sameToBody').style.display = "none"
                var UserMailMy = localStorage.getItem('userMailMy');
                //alert(UserMailMy)
                if(!UserMailMy){
                    swal("Entrer un email valide.", {
                        content: "input",
                        closeOnClickOutside: false,
                        })
                        .then((value) => {
                        localStorage.setItem("userMailMy", value)
                        swal({
                            title: "Comment ça marche ?",
                            text: `Cher visiteur,

                            Pour bénéficier de l'une ou plusieurs de nos formations, veuillez cliquer sur le bouton "Ajouter au panier" afin d'ajouter la formation sélectionnée à votre panier. Vous pouvez ajouter plusieurs formations au panier. Ensuite, cliquez sur le bouton "Panier" en haut pour visualiser vos sélections. Enfin, cliquez sur le bouton "Payer".
                            
                            Une fois le paiement réussi, vous recevrez un message dans votre boîte mail contenant les liens vers les formations. N'oubliez pas de consulter également votre dossier de spams pour vérifier vos messages.
                            
                            Nous vous remercions !`,
                            icon: "info",
                            closeOnClickOutside: false,
                        })
                        });
                }
               
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
                                <a href="product-detail.html?id=${productData.Idproduct}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                 Details  
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l item-title">
                                    <a href="product-detail.html?id=${productData.Idproduct}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${productData.NameOfstd}
                                    </a>

                                    <span class="stext-105 cl3">
                                        $${productData.Prix}
                                    </span>
                                </div>

                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a style="cursor:pointer;" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" onclick="addToCart('${productData.Idproduct}', '${productData.NameOfstd}', '${productData.Prix}', '${photoDataUrl}', '${productData.URLNormo}')">
                                    <i class="zmdi zmdi-shopping-cart"  style="font-size: 26px;"></i>
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
                                <a href="product-detail.html?id=${productData.Idproduct}" class="block2-btn flex-c-m stext-103 cl2 size-102 bg0 bor2 hov-btn1 p-lr-15 trans-04 js-show-modal1">
                                 Details  
                                </a>
                            </div>
                            <div class="block2-txt flex-w flex-t p-t-14">
                                <div class="block2-txt-child1 flex-col-l item-title">
                                    <a href="product-detail.html?id=${productData.Idproduct}" class="stext-104 cl4 hov-cl1 trans-04 js-name-b2 p-b-6">
                                    ${productData.NameOfstd}
                                    </a>

                                    <span class="stext-105 cl3">
                                        $${productData.Prix}
                                    </span>
                                </div>

                                <div class="block2-txt-child2 flex-r p-t-3">
                                    <a style="cursor:pointer;" class="btn-addwish-b2 dis-block pos-relative js-addwish-b2" onclick="addToCart('${productData.Idproduct}', '${productData.NameOfstd}', '${productData.Prix}', '${photoDataUrl}', '${productData.URLNormo}')">
                                    <i class="zmdi zmdi-shopping-cart"  style="font-size: 26px;"></i>
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



        function addToCart(productId, productName, productPrice, photoDataUrlX, proURLNormo) {
            // Vérifiez d'abord si localStorage existe
            if (typeof(Storage) !== "undefined") {
                // Récupérez le panier actuel depuis localStorage (s'il existe)
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
        
                // Ajoutez le produit actuel au panier
                const product = {
                    id: productId,
                    name: productName,
                    price: productPrice,
                    img: photoDataUrlX,
                    URLNormoX: proURLNormo
                };
                swal({
                    title: productName,
                    text: "a été ajouté au panier !",
                    icon: "success",
                    closeOnClickOutside: false,
                })
                cart.push(product);
                var AddToCard = document.getElementById('addToCard');
                AddToCard.innerHTML = ""
                var monDiv = document.getElementById('monDiv');
                // Ajoutez l'attribut data-notify avec la valeur "3"
                monDiv.setAttribute('data-notify', "");

                //for mobile
                var monDivx = document.getElementById('monDivx');
                // Ajoutez l'attribut data-notify avec la valeur "3"
                monDivx.setAttribute('data-notify', "");
                // Mettez à jour le panier dans localStorage
                localStorage.setItem("cart", JSON.stringify(cart));
                //alert("LocalStorage marche bien");
                // Vous pouvez également mettre à jour l'interface utilisateur pour refléter le changement dans le panier
                // (par exemple, en affichant le nombre d'articles dans le panier)
                setTimeout(()=>{
                    // Fonction pour récupérer les produits du panier depuis le localStorage
                getCartItemsAll()

                },100)
            } else {
                // Gestion du cas où le navigateur ne prend pas en charge localStorage
                alert("LocalStorage n'est pas pris en charge par votre navigateur. Veuillez mettre à jour votre navigateur.");
            }
        }
        function  getCartItemsAll(){         
            function getCartItems() {
                // Vérifiez d'abord si localStorage existe
                if (typeof(Storage) !== "undefined") {
                    // Récupérez le panier depuis localStorage (s'il existe)
                    const cart = JSON.parse(localStorage.getItem("cart")) || [];
                    return cart;
                } else {
                    // Gestion du cas où le navigateur ne prend pas en charge localStorage
                    alert("LocalStorage n'est pas pris en charge par votre navigateur. Veuillez mettre à jour votre navigateur.");
                    return [];
                }
            }

            var tablegogo = []
            // Exemple d'utilisation de la fonction getCartItems
            const cartItems = getCartItems();
           // console.log(cartItems); // Affiche les produits actuels dans le panier
            // Pour afficher le nombre dans le card
            var nIdCard = cartItems.length
            localStorage.setItem("takeTheNumBer", nIdCard)
            // Récupérez l'élément div par son ID
            var monDiv = document.getElementById('monDiv');
            // Ajoutez l'attribut data-notify avec la valeur "3"
            monDiv.setAttribute('data-notify', `${nIdCard}`);

            //for mobile
            var monDivx = document.getElementById('monDivx');
            // Ajoutez l'attribut data-notify avec la valeur "3"
            monDivx.setAttribute('data-notify', `${nIdCard}`);
            
            cartItems.forEach((K) => {
              //  console.log(K.price);
                var gogogog = K.price
                tablegogo.push(gogogog)
            });

          // console.log("mon tab " + tablegogo) 
         
           var sommeDuTableau = tablegogo.reduce(function(accumulateur, valeurCourante) {
            // Convertissez la chaîne de caractères en nombre entier
            var nombreCourant = parseInt(valeurCourante, 10);
        
            // Assurez-vous que la conversion a réussi avant d'additionner
            if (!isNaN(nombreCourant)) {
                return accumulateur + nombreCourant;
            } else {
                console.warn("La conversion de", valeurCourante, "en nombre a échoué.");
                return accumulateur;
            }
        }, 0);
        
        //console.log("La somme du tableau est : " + sommeDuTableau);
        document.getElementById('payMyInvoice').addEventListener('click', function(){

            var filteredProducts = cartItems.map(function(product) {
                return {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  // Vous pouvez ajouter d'autres propriétés si nécessaire
                };
              });
              
              // Afficher le nouveau tableau dans la console
              console.log(filteredProducts);
              var filteredProductsTelegram = cartItems.map(function(productT) {
                return {
                    URLNormoX: productT.URLNormoX,
                  // Vous pouvez ajouter d'autres propriétés si nécessaire
                };
              });
             // console.log(filteredProductsTelegram);
 
              // Transformez le tableau d'objets en un tableau d'URLs
                var urlArray = filteredProductsTelegram.map(function(obj) {
                    return obj.URLNormoX;
                });

                // Affichez le tableau d'URLs dans la console
             //   console.log(urlArray);

            openKkiapayWidget({
                amount: `${sommeDuTableau}`,
                position: "center",
                callback: "javascript:sendmycommandinCentremodale()",
                data: {
                    produits: filteredProducts
                },
                theme: "blue",
                sandbox : "true",
                key: "6979f3c098d511ee9fde7de6592cc8b4",
              });
             
              //la reponse du payement kkiapay
              addSuccessListener((response) => {
               // console.log(response);
                var trans = response.transactionId;
                //  console.log(trans);
                if (trans) {
                    cart = [];
                    // Mettre à jour le stockage local avec le panier vide
                    localStorage.setItem("cart", JSON.stringify(cart));
                    var UserMailMy = localStorage.getItem('userMailMy');
                       //  envoi de mail de suspension
                       const apiKey = "785B4029FA0EA1FB573C09903D5D557568F868BD402BE1746D1852EDFBC87D0249E623331ADD62923850AE601C019743";
                          const apiUrl = "https://api.elasticemail.com/v2/email/send";
                          // Définir les paramètres de l'e-mail
                          const emailParams = {
                            apiKey: apiKey ,
                            subject: "Url des formations",
                            from: "traducto.inter@gmail.com",
                            to: UserMailMy,
                            bodyHtml: `
                            <table cellpadding="10" cellspacing="0" style="background-color: #f1f1f1; padding: 20px;">
                            <tr>
                                <td>
                                <strong style="color: #333; text-align: center !important;">Url des formations</strong>
                                <p style="font-size: 16px; color: #666;">
                                  Chère ${UserMailMy},
                                  J'espère que ce message vous trouve bien. 
                                  Nous vous remercions pour votre confiance.
                                  Voici le(s) de(s) formation(s).
                                  ${urlArray.join('\n')}
                                </p>
                             
                                <p style="font-size: 16px; color: #666;">
                                  Restant à votre disposition pour toute information supplémentaire.
                                </p>
                                  
                                <p style="font-size: 14px; color: #999;">
                                    Cordialement,     
                                </p>
                                <p style="font-size: 14px; color: #999;">
                                  E-commerce Académie.
                                </p>
                                </td>
                            </tr>
                            </table>
                            `
                          };
                
                          // Effectuer une requête POST vers l'API ElasticEmail
                          fetch(apiUrl, {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/x-www-form-urlencoded"
                            },
                            body: new URLSearchParams(emailParams)
                          })
                            .then((response) => response.json())
                            .then((data) => {
                            console.log(data); // Afficher la réponse de l'API ElasticEmail
                                   if (data.success) {
                                   // window.location.href = "product.html"
                              
                              } else {
                                // window.location.href = "product.html"
                              } 
                            })
                            .catch((error) => {
                            //  window.location.href = "product.html"
                            });
                           // end envoi de mail de suspension

                    setTimeout(()=>{
                    window.location.href = "product.html"
                    },5000)
                } 
              });
        
           addFailedListener(error => {
                //console.log(error);
            });
        })

        //afficher le total
        document.getElementById('totalIdCArd').innerHTML = `Total :$ ${sommeDuTableau}`
            cartItems.forEach((Q)=>{
               var AddToCard = document.getElementById('addToCard');
               //tableOfPrice.push(Q.price)
               const productHTMLX = `
               <ul class="header-cart-wrapitem w-full" id="${Q.id}">
               <li class="header-cart-item flex-w flex-t m-b-12">
                   <div class="header-cart-item-img">
                       <img src="${Q.img} " alt="IMG">
                   </div>

                   <div class="header-cart-item-txt p-t-8">
                       <a href="#" class="header-cart-item-name m-b-18 hov-cl1 trans-04">
                       ${Q.name}
                       </a>
                       <span class="header-cart-item-info" style="display: flex !important;">
                         <p style="margin-right: 35px !important;">$ ${Q.price}</p>
                         <p style="cursor: pointer !important; color:red;" onclick="removeProductFromCart('${Q.id}')">Supprimer</p>
                       </span>
                      
                   </div>
               </li>
                <!------
               <li class="header-cart-item flex-w flex-t m-b-12">
                   <div class="wrap-num-product flex-w m-l-30 m-tb-10">
                       <div class="btn-num-product-down cl8 hov-btn3 trans-04 flex-c-m">
                           <i class="fs-16 zmdi zmdi-minus"></i>
                       </div>

                       <input class="mtext-104 cl3 txt-center num-product" type="number" name="num-product" value="1">

                       <div class="btn-num-product-up cl8 hov-btn3 trans-04 flex-c-m">
                           <i class="fs-16 zmdi zmdi-plus"></i>
                       </div>
                   </div>
               </li>
               ------>
           </ul><hr>
           `;
           AddToCard.innerHTML += productHTMLX; 
            })
        }
       
        getCartItemsAll()
    
        // Fonction pour supprimer un produit du panier
        function removeProductFromCart(productId) {
            // Vérifiez d'abord si localStorage existe
            if (typeof(Storage) !== "undefined") {
                // Récupérez le panier depuis localStorage (s'il existe)
                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                // Recherchez l'index du produit dans le panier
                const index = cart.findIndex(item => item.id === productId);

                // Si le produit est trouvé, supprimez-le du panier
                if (index !== -1) {
                    cart.splice(index, 1);
                    // Mettez à jour le panier dans localStorage
                    localStorage.setItem("cart", JSON.stringify(cart));
                    // Vous pouvez également mettre à jour l'interface utilisateur pour refléter le changement dans le panier
                     var AddToCard = document.getElementById('addToCard');
                     AddToCard.innerHTML = ""
                    // Mettez à jour le panier dans localStorage
                    //localStorage.setItem("cart", JSON.stringify(cart));
                    getCartItemsAll()
                } else {
                    console.log("Le produit n'a pas été trouvé dans le panier.");
                }
            } else {
                // Gestion du cas où le navigateur ne prend pas en charge localStorage
                alert("LocalStorage n'est pas pris en charge par votre navigateur. Veuillez mettre à jour votre navigateur.");
            }
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