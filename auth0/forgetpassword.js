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
  // Créer une référence à la base de données Firebase 
  const dbRef = firebase.database().ref();
  //document.getElementById('sameToBodyx').style.display = "block"
  // Obtenez l'e-mail et le mot de passe de l'utilisateur
 
  function submitmy(){
    const email = document.getElementById('email').value;
        // Envoi de l'e-mail de réinitialisation du mot de passe 
        firebase.auth().sendPasswordResetEmail(email)
        .then(function() {
            document.getElementById('sameToBodyx').style.display = "none"
          Swal.fire({
            icon: 'success',
            allowOutsideClick: false,
            text: "L'e-mail de réinitialisation du mot de passe a été envoyé avec succès !", 
            //footer: '<a href="login.html">Connectez-vous</a>',
            confirmButtonText: "D'accord", 
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "forgetpassword.html"
            } 
          })
          // L'e-mail de réinitialisation du mot de passe a été envoyé avec succès
        })
        .catch(function(error) {
          // Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe
          document.getElementById('sameToBodyx').style.display = "none"
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorMessage)
          Swal.fire({
            icon: 'error',
            allowOutsideClick: false,
            text: "Une erreur s'est produite lors de l'envoi de l'e-mail de réinitialisation du mot de passe", 
            //footer: '<a href="login.html">Connectez-vous</a>',
            confirmButtonText: "D'accord", 
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "forgetpassword.html"
            } 
          });
        });
  }