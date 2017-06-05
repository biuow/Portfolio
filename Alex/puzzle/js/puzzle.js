$(document).ready(function(){
var upval, downval, leftval, rightval, txt, bVal;

$("#5").fadeOut(0);

for(i=1;i<=9;i++){
	if($("#"+i).text() != ""){
		j = $("#"+i).text();
		imageUrl = "puzzle/img/pikachu"+j+".jpg";
		$("#"+i).css("background-image","url(" + imageUrl + ")");
	}
}


$("button").click(function(){
    txt = $(this).text();
    bVal = $(this).val();   
    if(txt != ""){
        if((bVal != 1) && (bVal != 2) &&(bVal != 3)){
            upval = eval(eval(bVal)-eval(3));           
            var upTxt = $("#"+upval).text();            
            if(upTxt == ""){
                $(this).fadeOut(300);
                $(this).text("");
                $("#"+upval).fadeIn(300);
                $("#"+upval).text(txt);
            }
        }
        if((bVal != 7) && (bVal != 8) &&(bVal != 9)){
            downval = eval(eval(bVal)+ eval(3));            
            var downTxt = $("#"+downval).text();
            if(downTxt == ""){          
                $(this).fadeOut(300);
                $(this).text("");
                $("#"+downval).fadeIn(300);
                $("#"+downval).text(txt);
            }
        }
        if((bVal != 1) && (bVal != 4) &&(bVal != 7)){
            leftval = eval(eval(bVal)-eval(1));         
            var leftTxt = $("#"+leftval).text();
            if(leftTxt == ""){          
                $(this).fadeOut(300);
                $(this).text("");
                $("#"+leftval).fadeIn(300);
                $("#"+leftval).text(txt);
            }
        }
        if((bVal != 3) && (bVal != 6) &&(bVal != 9)){
            rightval = eval(eval(bVal)+ eval(1));           
            var rightTxt = $("#"+rightval).text();          
            if(rightTxt == ""){                 
                $(this).fadeOut(300);
                $(this).text("");
                $("#"+rightval).fadeIn(300);
                $("#"+rightval).text(txt);
            }
        }
        var one = $("#1").text();
        var two = $("#2").text();
        var three = $("#3").text();
        var four = $("#4").text();
        var five = $("#5").text();
        var six = $("#6").text();
        var seven = $("#7").text();
        var eight = $("#8").text();
        var nine = $("#9").text();

        if((one == "1")&&(two == "2")&&(three == "3")&&(four == "4")&&(five == "5")&&(six == "6")&&(seven == "7")&&(eight == "8")&&(nine == "")){           
            alert("Aeee!! Você ganhou! :D");
            $("button").attr("disabled", "disabled");
        }               
    }  

	for(i=1;i<=9;i++){
		if($("#"+i).text() != ""){
			j = $("#"+i).text();
			imageUrl = "puzzle/img/pikachu"+j+".jpg";
			$("#"+i).css("background-image","url(" + imageUrl + ")");
		}
	}	
});

});


