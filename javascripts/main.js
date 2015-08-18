requirejs.config({
  baseUrl: './javascripts',
  paths: {
    'jquery': '../bower_components/jquery/dist/jquery.min',
    'lodash': '/bower_components/lodash/lodash.min',
		'firebase': '../bower_components/firebase/firebase',
    'hbs': '../bower_components/require-handlebars-plugin/hbs',
    'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min'
  },
  shim: {
    'bootstrap': ['jquery'],
		'firebase': {
			exports: 'Firebase'
		}
  }
});

requirejs(
["jquery", "lodash", "firebase", "hbs", "bootstrap", "add_family", "remove_family"],
	function ($, _, _firebase, Handlebars, bootstrap, addFam, removeFam) {
		
		var myFirebaseRef = new Firebase("https://nss-rachel-family.firebaseio.com/");
    var family;
    var famArray = [];
    myFirebaseRef.on("value", function(snapshot) {
      family = snapshot.val();
      loadFamily(family);
      console.log(family);
    });

    function loadFamily(family) {
      require(['hbs!../templates/family_list'],            
        function(template) {
        $(".familyList").html(template(family));
      });
    }
  
  $(document).on("click", ".remove", function() {
    var deleteFam = $(this).siblings("h4").text();
    var memberKey = _.findKey(family.family, {"name": deleteFam});
    console.log("family", family);
    
    console.log("memberKey", memberKey);


    removeFam.delete(memberKey);
  });  
    
  $(".addFamily").click(function(){
      console.log("click to add family");
    event.preventDefault();

    addFam.addFamily("family", family);

  });
    
});