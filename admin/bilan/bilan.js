//Your web app's Firebase configuration
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

const urlParams = new URLSearchParams(window.location.search); 
 const bilanuserId = urlParams.get("user-id");
//const bilanuserId = "JyPM9obdRafgNHOZZ8e4piR1SVA3"

firebase.auth().onAuthStateChanged(function(user) { 
if(user){ 
    var submitid = document.getElementById("submitid");
    submitid.addEventListener("click", submitmy)
    function submitmy() {
        var BILAN = document.getElementById("BilanID").value; 
        var SERVICESABPFPRICE = document.getElementById("soldeId").value;;         
           const newData = {
            BILAN: BILAN,
            SERVICESABPFPRICE: SERVICESABPFPRICE,
            ID_PAIMENT:"",
            ACCESSABPF:true
           };
           const userRefx = database.ref(`/utilisateurs/${bilanuserId}`);
           userRefx.update(newData, (error) => {
             if (error){
                Swal.fire({
                title: "Ooops",
                confirmButtonText: "D'accord",
                allowOutsideClick: false,
                text: "les données ne sont pas mise à jour ",
                icon: 'error'
                }).then((result)=>{
                if(result.isConfirmed){
                    window.location.reload(); 
                }
             })
             }else{
                Swal.fire({
                icon: 'success',
                title:"Succès",
                confirmButtonText: "D'accord",
                allowOutsideClick: false,
                text : `les données ont été mise à jour avec succès !`,
                }).then((result)=>{
                if(result.isConfirmed){
                window.location.reload();
                }
            })
             }
        })
    } 
}else{
    window.location.href = "../loginadmin.html"
}
})

