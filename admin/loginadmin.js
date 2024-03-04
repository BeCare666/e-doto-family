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
  // get cookies option for user
{/*  const UserConnectId = localStorage.getItem("ToacceptCookies");
  if(UserConnectId){
  var savedUsername = localStorage.getItem("Email");
  var savedPassword = localStorage.getItem("Password");
  document.getElementById('email').value = savedUsername
  document.getElementById('password').value = savedPassword
}*/}
  // Obtenez une référence à l'emplacement contenant les données d'utilisateur
  const usersRef = dbRef.child("utilisateurs");
    // Écoute de l'événement "click" sur le bouton de recherche
    // Écoute de l'événement "click" sur le bouton de recherche ToacceptCookies
  function submitmy(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  document.getElementById('preloader').style.display = "block"
  // Obtenez l'e-mail et le mot de passe de l'utilisateur
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
        // La connexion a réussi, vous pouvez accéder à l'utilisateur
        var user = userCredential.user;
        var useruid = user.uid;
        if(user.emailVerified){
        // L'utilisateur existe avec l'e-mail et le mot de passe donnés 
        document.getElementById('preloader').style.display = "none"
        //const userId = userSnapshot.key;
        document.getElementById('email').value = ""
        document.getElementById('password').value = ""
        Swal.fire({
        icon: 'success',
        title:"Succès",
        allowOutsideClick: false,
        text : `Vous êtes connecté avec succès !`,
        })
        localStorage.setItem('unserconnect', useruid)
        localStorage.setItem('unserconnectmail', email)
        // funnction to get cookies options     
        localStorage.setItem("Email", email);
        localStorage.setItem("Password", password);
        setTimeout(()=>{
        window.location.href = "admin.html"
        },5000)
        }else{
          document.getElementById('preloader').style.display = "none"
          document.getElementById('email').value = ""
          document.getElementById('password').value = ""
          Swal.fire({
          title: "Ooops",
          text: "Vous n'avez pas encore validé votre e-mail !",
          icon: 'info'
          }).then((result)=>{
          if(result.isConfirmed){
            window.location.href = "loginadmin.html"
          }
          })
        }
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    //console.error('Error:', errorMessage);
    if (errorCode === 'INVALID_LOGIN_CREDENTIALS'){
    console.error('Error:', errorCode, errorMessage);
    document.getElementById('preloader').style.display = "none"
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""
    Swal.fire({
        icon: 'error',
        title:"Erreur ",
        allowOutsideClick: false,
        text : `L'utilisateur n'existe pas avec cet adresse mail !`,
    })
   
  }else if(errorCode === 'auth/wrong-password'){
    document.getElementById('preloader').style.display = "none"
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

    Swal.fire({
        icon: 'error',
        title:"Erreur ",
        allowOutsideClick: false,
        text : `Mot de passe incorrect !`,
    })
  }else{
    document.getElementById('preloader').style.display = "none"
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""
    Swal.fire({
        icon: 'error',
        title:"Erreur ",
        allowOutsideClick: false,
        text : `L'utilisateur n'existe pas ou vos identifiants sont incorrect  `,
    })
  }
  });  
}