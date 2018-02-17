
// <input type="text" id="text"></input>
//   <button id="add">Set</button>
//   <div id="data"></div>

var object = {}
var value;


function init(){
	chrome.storage.sync.get(null,function(items){
		object = items;
		for(var key in object){
		};
    printItems();		
	});
}


function printItems(){
	document.getElementById("data").innerHTML = "";
	for(var key in window.object){
		var content = document.getElementById("data");
	 	var text = document.createTextNode(object[key]);
    var button = document.createElement("button");
    button. innerHTML = "finish";
    button.id = key;
    button.class = "finish";
	 	var para = document.createElement("p");
	 	para.appendChild(text);
	 	content.appendChild(para);	
    content.appendChild(button);
	}
	
 }
 
function add() {
        var theValue = document.getElementById("text").value;
        // Check that there's some code there.
        if (!theValue) {
          message('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        var key = Object.keys(object).length.toString();
        
        // Update object.
        object[key] = theValue;
        // Store object to Chrome.storage
        chrome.storage.sync.set(object, function() {
          // Notify that we saved.
        	// alert(object);
        	printItems();
        });
        
}

document.getElementById("add").onclick = function(){
	 	add();
 }


document.getElementByClassName("finish").onclick = function(){
    
 }

document.getElementById("clear").onclick = function(){
    clear();
 }

document.body.onload = function(){
  init();
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {
    var storageChange = changes[key];
    console.log('Storage key "%s" in namespace "%s" changed. ' +
                'Old value was "%s", new value is "%s".',
                key,
                namespace,
                storageChange.oldValue,
                storageChange.newValue);
  }
});

  function clear(){
  	chrome.storage.sync.clear(function(){
    init();
  });
  }



// printItems();














