		
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
            if (snapshot.exists()) {
                document.getElementById('sameToBody').style.display = "none"
                var BILAN = snapshot.val().BILAN
                var SERVICESABPFPRICE = snapshot.val().SERVICESABPFPRICE              
                if(snapshot.val().ACCESSABPF == true){
                    openKkiapayWidget({
                    amount:`${SERVICESABPFPRICE}`,
                    position: "center",
                    callback: "javascript:sendmycommandinCentremodale()",
                    data: `${BILAN}`,
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
                            ACCESSABPF:false,
                            ID_PAIMENT : trans,
                            Datetime: fullDate
                    };
                        const userRefx = database.ref(`/utilisateurs/${userId}`);
                        userRefx.update(newData, (error) => {
                          if (error){
                            Swal.fire({
                            title: "Erreur ",
                            text: "les données ne sont pas mise à jour. Contactez le support e-doto family pour en savoir plus. Mais Vérifiez votre boîte mail pour téléchargé votre facture. Merci !",
                            icon: "error",
                            allowOutsideClick: false,
                            confirmButtonText: "D'accord",
                         })
                        }else{
                            Swal.fire({
                                title: "Félicitations",
                                text: "Votre accès a été finalisé. Vérifiez votre boîte mail pour téléchargé votre facture. Merci !",
                                icon: "success",
                                allowOutsideClick: false,
                                confirmButtonText: "D'accord",
                            }).then((result)=>{
                                if(result.isConfirmed){
                                    window.location.href = "profil.html"
                                }
                             })                 
                          }
                         })
                        });
                        addFailedListener(error => {
                           // console.log(error);
                           setTimeout(()=>{
                            window.location.reload();
                      },700)
                        });
                    }else{
                    Swal.fire({
                    title: "Oops",
                     text: "Vous n'êtes pas autorisé à cet espace. Merci ",
                     icon: "info",
                     allowOutsideClick: false,
                     confirmButtonText: "D'accord",
                    }).then((result)=>{
                        if(result.isConfirmed){
                            window.location.href = "profil.html"
                        }
                     })               
                    }  
            }else{  
                window.location.href = "./auth0/login.html"
            }  
    
    })
        }else{
            window.location.href = "./auth0/login.html"
        }
    
    })
