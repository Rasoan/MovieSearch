


function getUser(name){
  fetch(`http://www.omdbapi.com/?t=${name}&apikey=812ef198`)
   .then(function(response) {
     return response.json();
   })
   .then(function(json) {
     console.log(json);
   });
 };
 
 


let my_button_search = document.querySelector(".button-search");
let my_input_search = document.querySelector(".input-search");

my_button_search.addEventListener("click", element => {

  getUser('t');
});
