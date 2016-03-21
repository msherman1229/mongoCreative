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
		var doneHTML = "<h2>" + $("#Item").val() + " has been added to your to do list!<h2>"; 
	        $("#done").html(doneHTML); 
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
			var everything = "<table class='table'><th>Done?</th><th>Current Items</th><tbody>";
			for (var item in data) {
				it = data[item];
				var color = "white";
				if (it.Importance == 1)
				{
					color = "lightblue";
				}
				else if (it.Importance == 2)
				{
					color = "lightgreen"; 
				}
				else if (it.Importance == 3)
				{
					color = "yellow";
				}
				else if (it.Importance == 4)
				{
					color = "red";
				}
				everything += "<tr bgcolor=" + color + "><td class='col-md-1'><input type='checkbox' name='complete' class='checked' id=" + it._id + "></td><td class='col-md-11'>" + it.Item + "</td>";
			}
			everything += "</tbody></table>"; 
			$("#list").html(everything); 
		}
	}); 
	});  
    $("#updateThem").click(function() {
	$(".checked").each(function() {
		if ($(this).is(':checked'))
		{
		var removeUrl = "list" + "?q=" + $(this).attr('id');
		$.ajax({
			url:removeUrl, 
			type:"DELETE", 
			contentType:"application/json; charset=utf-8", 
			success:function() {
				var getUrl = "list" + "?q=" + $("#ID").val();
        $.ajax({
                url:getUrl,
                type:"GET",
                contentType:"application/json; charset=utf-8",
                success:function(data, textStatus) {
                        var everything = "<table class='table'><th>Done?</th><th>Current Items</th><tbody>";
                        for (var item in data) {
                                it = data[item];
                                var color = "white";
                                if (it.Importance == 1)
                                {
                                        color = "lightblue";
                                }
                                else if (it.Importance == 2)
                                {
                                        color = "lightgreen";
                                }
                                else if (it.Importance == 3)
                                {
                                        color = "yellow";
                                }
                                else if (it.Importance == 4)
                                {
                                        color = "red";
                                }
                                everything += "<tr bgcolor=" + color + "><td class='col-md-1'><input type='checkbox' name='complete' class='checked' id=" + it._id + "></td><td class='col-md-11'>" + it.Item + "</td>";
                        }
                        everything += "</tbody></table>";
                        $("#list").html(everything);
                }
        });
			}
		}); 
		}
	});
	}); 
});
