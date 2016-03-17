$(document).ready(function(){
    $("#add").click(function(){
        var myobj = {ID:$("#ID").val(),Item:$("#Item").val(),Importance:$("input[name=importance]:checked").val(),Completed:0};
        jobj = JSON.stringify(myobj);
        $("#json").text(jobj);
        var url = "list"; 
        $.ajax({
	    url:url, 
	    type:"POST", 
	    data:jobj, 
	    contentType:"application/json; charset=utf-8", 
	    success:function(data,textStatus) {
	        $("#done").html(textStatus); 
	    }
        });
    });
    $("#getThem").click(function() {
	var getUrl = "list" + "?q=" + $("#ID").val();  
	$.ajax({
		url:getUrl, 
		type:"GET",  
		contentType:"application/json; charset=utf-8", 
		success:function(data, textStatus) {
			var everything = "<ul>";
			for (var item in data) {
				it = data[item]; 
				everything += "<li>ID : " + it.ID + " -- Item: " + it.Item + " --Importance " + it.Importance + " -- Completed? " + it.Completed; 
			}
			everything += "</ul>"; 
			$("#comments").html(everything); 
		}
	}); 
	});  
});
