
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
	 	
    // Create text element
    // Create paragraph element
    // Create button element
    // Create div element (to hold both text & button)
    // Create div_text element
    // Create div_button element 
    
    var text = document.createTextNode(object[key]);
    var para = document.createElement("p");
    var button = document.createElement("button");
    var div_entry = document.createElement("div");
    var div_text = document.createElement("div");
    var div_button = document.createElement("div");

    // Add javscript features to button element.
    // button. innerHTML = "finish";
    button.id = key;
    button.value = key;
    button.addEventListener('click', function(event) {clear_a_task(this.value)}, false);
    button.className = "class_clear_task_button";
    // Add javscript features to div_entry element.
    div_text.id = "id_text";
    div_button.id = "id_button";
    div_entry.id = "id_entry";
    // Arrange the sequence of all the elements.
    // Put textNode into paragraph element.
    // Put para and button into div_entry.
    // Lastly, put entry_div into "data" area.
    para.appendChild(text);
    div_text.appendChild(para);
    div_button.appendChild(button);
    
    div_entry.appendChild(div_text);
    div_entry.appendChild(div_button);
    content.appendChild(div_entry);
	}
 }

 function clear_a_task(value){
  delete window.object[value];
  printItems();
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















