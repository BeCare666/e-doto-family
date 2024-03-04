const TheVale = localStorage.getItem('passIdschedule');
const TheValelname = localStorage.getItem('theValelname');
const TheValeemail = localStorage.getItem('theValeemail')
if(!TheVale){
  window.location.href =  "../profil.html"
}

  // Tracking information object
  var tracking = {
    utmSource: 'Google',
    utmMedium: 'cpc',
    utmCampaign: 'fall_campaign',
  }
  
  // Object with Customer info
  var customer = {
    lname: TheValelname,
    email: TheValeemail,
    a1: '',
  }
  // Data object with Team, Event Type, and UTM info
{/*var linkData = {
  team: 'coffee-shop',
  et: 'coffee-cupping',
}*/}

  // Generate Dynamic Path 

  //var dynamicPath = 'https://calendly.com/' + linkData.team + '/' + linkData.et;

  var dynamicPath = 'https://calendly.com/e-doto/30min/'
  
  // Call the Calendly Badge Widget
  Calendly.initBadgeWidget({ 
      url: dynamicPath, 
      prefill: {
        name:  customer.lname,
        email: customer.email,
        customAnswers: {
          a1: customer.a1,
        },
        utm: {
          utmCampaign: tracking.utmCampaign,
          utmSource: tracking.utmSource,
          utmMedium: tracking.utmMedium,
        },  
      },
      text: 'Salut ' + customer.lname + ' ! ' + 'Prend ton rendez-vous ici.',
      color: '#000000', 
      textColor: '#ffffff', 
      branding: false
  });