define(function() {
  
  return {

    addFamily: function(newFam)  {
    // Created var for movie
      var newFamily = {
        "name": $("#firstLastName").val(),
        "age": $("#memberAge").val(),
        "gender": $("input[type=radio]:checked").val(),
        "skills": $("#memberSkills").val(),
      };
    
      console.log("newFamily", newFamily);
    
    // send to FireBase
          
      $.ajax({
        url: "https://nss-rachel-family.firebaseio.com/family.json",
        method: "POST",
        data: JSON.stringify(newFamily)
      }).done(function(addedFamily) {
        console.log("addedFamily", addedFamily);
        });
    }
  };
});