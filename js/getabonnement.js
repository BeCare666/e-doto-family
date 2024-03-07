		
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
            const userafiliateIdC = localStorage.getItem("userafiliateIdC");
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

                }else{

         document.getElementById('priceOfABONNE1w').addEventListener('click', function(){ 
            if(snapshot.val().ABONNEMENT == false){
                openKkiapayWidget({
                    amount: "1",
                    position: "center",
                    callback: "javascript:sendmycommandinCentremodale()",
                    data: "",
                    theme: "blue",
                    key: "deb48fc468f8e7fcc35aee7ae721254a3427f5e5",
                  });
                
                addSuccessListener((response) => {
                //console.log(response);
                var d = new Date();
                var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                var hours = d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                var fullDate = date + ' ' + hours;
                 
                 var trans = response.transactionId;
                  const newData = {
                    ABONNEMENT : true,
                    ID_PAIEMENT : trans,
                    Datetime: fullDate
                };
                const userRefx = database.ref(`/utilisateurs/${userId}`);
                userRefx.update(newData, (error) => {
                  if (error){
                    Swal.fire({
                        title: "Erreur ",
                        text: "les données ne sont pas mise à jour",
                        icon: "error",
                        closeOnClickOutside: false,
                        })
                  }else{
                    Swal.fire({
                        title: "Félicitations",
                        text: "Votre abonnement a été finalisé!",
                        icon: "success",
                        closeOnClickOutside: false,
                    })
                    const userafiliateIdC = localStorage.getItem("userafiliateIdC");
                    alert(userafiliateIdC)
                    if(userafiliateIdC){
                        const userRef = database.ref(`/utilisateurs/${userafiliateIdC}`);
                        userRef.once("value")
                        .then((snapshot) => {
                        if (snapshot.exists()) {
                        var COMMISSIONVALUE = snapshot.val().SOLDEAFILIATE
                        var username = snapshot.val().username
                        var UserEmail =  snapshot.val().email
                        var addCommission = "100"
                        var myComptaConvertis = parseFloat(COMMISSIONVALUE);
                        var addCommissionConvertis = parseFloat(addCommission)
                        var myCommissionAdd = myComptaConvertis + addCommissionConvertis
                        const newData = {
                            STATUSAFILIATE : true,
                            SOLDEAFILIATE: myCommissionAdd
                        };
                        const userRefx = database.ref(`/utilisateurs/${userafiliateIdC}`);
                        userRefx.update(newData, (error) => {
                          if (error){
                            localStorage.removeItem("userafiliateIdC");
                            Swal.fire({
                                title: "Erreur ",
                                text: "une erreur s'est produite lors de la mise à jour du  compe de votre affilié.",
                                icon: "error",
                                closeOnClickOutside: false,
                                })
                          }else{
                            localStorage.removeItem("userafiliateIdC");
                        setTimeout(()=>{
                                window.location.reload();
                        },700)
                          }
                        })
                        }})
                    }else{
                    setTimeout(()=>{
                            window.location.reload();
                    },700)
                    }
                    
                  }
                 })
                });
            }else{
                Swal.fire({
                    title: "Oops",
                    text: "Vous avez déjà un abonnement en cours. Merci ",
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
