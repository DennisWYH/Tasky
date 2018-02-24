
// <input type="text" id="text"></input>
//   <button id="add">Set</button>
//   <div id="data"></div>

var object = {}
var value;


function init(){
	chrome.storage.sync.get(null,function(items){
		window.object = items;
        printItems();		
	});
}


function printItems(){
	$("#data").html("");

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
    var div_task_content = document.createElement("div");
    var div_button = document.createElement("div");

    // Add javscript features to button element.
    // button. innerHTML = "finish";
    button.id = key;
    button.value = key;
    button.addEventListener('click', function(event) {clear_a_task(this.value)}, false);
    button.className = "class_clear_task_button";
    // Add javscript features to div_entry element.
    div_task_content.id = "div_task_content";
    div_button.id = "div_flag_button";
    div_entry.id = "div_entry";

    // Arrange the sequence of all the elements.
    // Put textNode into paragraph element.
    // Put para and button into div_entry.
    // Lastly, put entry_div into "data" area.
    para.appendChild(text);
    div_task_content.appendChild(para);
    div_button.appendChild(button);
    
    div_entry.appendChild(div_task_content);
    div_entry.appendChild(div_button);
    content.appendChild(div_entry);
	}
    
    // Action on elements 
    $( "[id = div_task_content]").on("click", function(){    
        alert("mouseX");
    });

 }



 function clear_a_task(value){
        delete window.object[value];
        console.log(value + object[value]);
        chrome.storage.sync.remove(value.toString(), function() {
            // Notify that we saved.
            printItems();
        });
 }
 
function add() {
        var theValue = $("#input_box").val();
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
        	printItems();
        }); 
}

function down(e){
    console.log("hi there");
};

$("#add_task_button").click(function(){
	 	add();
 });


$("#clear_all_button").click(function(){
    clear();
 });

window.onload = function(){
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


















