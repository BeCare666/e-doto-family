function validerSaisie(input) {
    const valeurSaisie = input.value;
    const regexLettresAvecEspaces = /^\d+$/;
  
    if (!regexLettresAvecEspaces.test(valeurSaisie)) {
      //alert("ne fait pas ça")
      // Effacez la saisie incorrecte
      input.value = input.value.replace(/\D/g, '');
     
    } else {
    }
  }