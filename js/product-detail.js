// Récupérer l'ID du produit depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");
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
   
const productRef = database.ref("Thedatas/" + productId);

productRef.once("value")
.then(function(snapshot) {
document.getElementById('sameToBody').style.display = "none"
const productData = snapshot.val();
console.log(productData)
if (productData) {
    var theCardDetail = document.getElementById('cardDetail');
    var theCardDetail2 = document.getElementById('cardDetail2')
    var theCardDetail3 = document.getElementById('cardDetail3')
    var theCardDetail4 = document.getElementById('cardDetail4')

    var theCardDetailx = document.getElementById('cardDetailx');
    theCardDetailx.innerHTML = `${productData.NameOfstd} `
    var theCardDetail2x = document.getElementById('cardDetail2x')
    var theCardDetail3x = document.getElementById('cardDetail3x')
    var theCardDetail4x = document.getElementById('cardDetail4x')

    var theCardDetail5 = document.getElementById('cardDetail5')
    var theCardDetail6 = document.getElementById('cardDetail6')
    var theCardDetail7 = document.getElementById('cardDetail7') 
    var theCardDetail8 = document.getElementById('cardDetail8')
    var DescriptionProduct = document.getElementById('descriptionProduct')
    var OldPrice = document.getElementById('oldPrice') 
    var NewPrice = document.getElementById('newPrice')
    var TypeCateId = document.getElementById('typeCateId')
    var ToAddToCard = document.getElementById('toAddToCard')
    // Créez la source de l'image
    var photoDataUrl = 'data:image/png;base64,' + productData.RollNo;
    var photoDataUrl1 = 'data:image/png;base64,' + productData.RollNoX;
    var photoDataUrl2 = 'data:image/png;base64,' + productData.RollNoX3;
    var photoDataUrl3 = 'data:image/png;base64,' + productData.RollNoX4;
    //var BreadcrumbId = document.getElementById('breadcrumbId');
   // BreadcrumbId.innerHTML = `${productData.Category} `
    // Affectez la source à l'élément img
    theCardDetail.src = photoDataUrl;
    theCardDetail2.src = photoDataUrl1;
    theCardDetail3.src = photoDataUrl2;
    theCardDetail4.src = photoDataUrl3;

    theCardDetail.href = photoDataUrl;
    theCardDetail2.href = photoDataUrl1;
    theCardDetail3.href = photoDataUrl2;
    theCardDetail4.href = photoDataUrl3;


    theCardDetail5.src = photoDataUrl;
    theCardDetail6.src = photoDataUrl1;
    theCardDetail7.src = photoDataUrl2;
    theCardDetail8.src = photoDataUrl3;
    OldPrice.innerHTML = `${productData.PrixNormo} FCFA` 
    NewPrice.innerHTML = `${productData.PrixPromo} FCFA` 
    DescriptionProduct.innerHTML = `${productData.Genboxtextarea}`
    TypeCateId.innerHTML = `${productData.Category}`
    ToAddToCard.innerHTML = `
    <a href="https://wa.me/+22956744215?text=Salut E-commerce%20Académie,%20comment%20allez-vous%20?20%Je%20suis%20vraiment%20intéressé%20par%20cet article%20que%20j'ai%20vu%20sur%20votre%20site.
    J'aimerais en savoir plus s'ils vous plaît. Voici le lien de la formation  : ${encodeURIComponent('https://eco-academie.netlify.app/product-detail.html?id=' + `${productData.Idproduct}`)}"
    class="p-view"  
    style="color: white !important;">
    Contactez-nous
    
    </a>
    
    `


   // function to add product
   var jsaddcartdetail = document.getElementById('js-addcart-detailId');
   jsaddcartdetail.innerHTML = `
   <p onclick="addToCart('${productData.Idproduct}', '${productData.NameOfstd}', '${productData.Prix}', '${photoDataUrl}')">Add to card</p>
   `


} else {
  console.log("Aucun produit trouvé avec cet ID.");
}

   function addToCart(productId, productName, productPrice, photoDataUrlX) {
    // Vérifiez d'abord si localStorage existe
    if (typeof(Storage) !== "undefined") {
        // Récupérez le panier actuel depuis localStorage (s'il existe)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Ajoutez le produit actuel au panier
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            img: photoDataUrlX
        };
        cart.push(product);
        Swal.fire({
            title: "Cet produit n'est pas dans le panier",
            text: "Voulez vous l'acheter",
            icon: "success"
          }).then((result)=>{
            if(result.isConfirmed){
                window.location.href = "product.html?card=true"
            }
          })
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

})
.catch(function(error) {
console.error("Erreur lors de la récupération du produit :", error);
});

// function to comme back
function goBack() {
window.history.back();
}

function addToCart(productId, productName, productPrice, photoDataUrlX) {
    // Vérifiez d'abord si localStorage existe
    if (typeof(Storage) !== "undefined") {
        // Récupérez le panier actuel depuis localStorage (s'il existe)
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // Ajoutez le produit actuel au panier
        const product = {
            id: productId,
            name: productName,
            price: productPrice,
            img: photoDataUrlX
        };
        cart.push(product);
        swal({
            title: productName,
            text: "a été ajouté au panier !",
            icon: "success",
            closeOnClickOutside: false,
        }).then((value) => {
            window.location.href = "product.html?card=true"
          });
        
        
          
        // Mettez à jour le panier dans localStorage
        localStorage.setItem("cart", JSON.stringify(cart));
        //alert("LocalStorage marche bien");
        // Vous pouvez également mettre à jour l'interface utilisateur pour refléter le changement dans le panier
        // (par exemple, en affichant le nombre d'articles dans le panier)

    } else {
        // Gestion du cas où le navigateur ne prend pas en charge localStorage
        alert("LocalStorage n'est pas pris en charge par votre navigateur. Veuillez mettre à jour votre navigateur.");
    }
}
