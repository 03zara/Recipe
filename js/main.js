
var myData;
var input = document.getElementById("input");
var button = document.getElementById("button");
 

 // when search button is clicked, load API data  - loadData function is below                   
button.addEventListener("click", loadData, false);


//create a function where search bar and button pulsates until mouse is hovered over

function mouseAnimation() {
    input.onmouseover = function() {
    input.style.animationIterationCount = "0";
    }       

    input.onmouseout = function() {
        input.style.animationIterationCount = "infinite";
    }     

    button.onmouseover = function() {
        button.style.animationIterationCount = "0";
    }       

    button.onmouseout = function() {
        button.style.animationIterationCount = "infinite";
    }     
}

mouseAnimation();




function loadData() {
        
    
    var myRequest = new XMLHttpRequest();
        
    var recipeName = input.value;
        
    
    myRequest.open('GET', 'https://api.edamam.com/search?q='+recipeName+'&app_id=83c25dee&app_key=278fa7701c6f4702aa13155db93aa192&from=0&to=100&calories=591-722&health=alcohol-free', true);
    
//    myRequest.responseType = 'text';
        
                
    myRequest.onload = function() {
        
    
        if (myRequest.readyState == 4 && myRequest.status == 200){

            myData = JSON.parse(myRequest.responseText);
        
            function clearAll() {
                var hideText = document.getElementsByClassName('results');
				
                for(var i = 0; i < hideText.length; i++){
                    hideText[i].style.display = "none";
				    }
            }
            
            // if nothing is typed or wrong input in the search bar, display error message.
            
            if (recipeName === "") {
                
				clearAll();

				document.getElementById("message").innerHTML = "Please type in a recipe name to load data...";

			} 
            
            else if (myData.hits.length == 0) {
               document.getElementById("message").innerHTML = "No recipes found. Please search for a valid recipe name...";
                clearAll();
            }
            
            else {
                
            clearAll();
                
            document.getElementById("welcome").style.display = "none";
                
            document.getElementById("message").innerHTML = "";
                

                  // search can display up to 100 recipes (hits)  
                for (var j = 0; j < 100; j++) {

                    // create a div to display each array of recipes (hits)
                var showItems = document.createElement("div");

                showItems.setAttribute('class', 'results'); 
                document.body.appendChild(showItems);
                    
                showItems.style.display = "block";
                    
                    // hide all other dives after array of recipes have ended
                    if (j > myData.hits.length - 1) {
                        showItems.style.display = "none";; 
                    }
                    else {
                    
                    var links = document.getElementsByTagName('a');
                    var len = links.length;

                        for(var k=0; k<len; k++) {   
                            links[k].target = "_blank";
                        }

                      // displaying the results of all the recipe names with images and links to the relevant pages  
                    var images = myData.hits[j].recipe.image;
                    var pic = "<br/> <a href=" + myData.hits[j].recipe.url+ "> <img src="+images+" width='175' height='175'> </a>"; 
                    var foodName = "<br/><a href="+ myData.hits[j].recipe.url +">"+myData.hits[j].recipe.label+ "<br/></a>";
                
                    showItems.innerHTML = foodName + pic + "<br/><br/>";
                    
                    }                   
                    
                }
            

            }
            
        
        }
        else {
            
            document.getElementById("image").innerHTML = "We successfully connected to the server but it returned an ERROR!";
        }
        
        
        
            
    }

    myRequest.onerror = function() {

		document.getElementById("image").innerHTML = "You are not connected online and can't reach the server!";
	}
    
    
    myRequest.send();
     
    
}

