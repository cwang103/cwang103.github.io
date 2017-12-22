function blinker() {
	$('#gokartblink').fadeOut(800);
	$('#gokartblink').fadeIn(800);
	
	$('#fasterblink').fadeIn(800);
	$('#fasterblink').delay(800).fadeOut(1600);
}

setInterval(blinker, 1000);

var i = 1;
function type() {
	var message = "Are you ready?";
	if (i <= message.length) {
		var text = message.substring(0,i);
		document.getElementById('type').innerHTML = text;
		setTimeout('type()',400);
		i++;
	}else {
		i = 1;
		document.getElementById('type').innerHTML = "";
		setTimeout('type()',400);
	}
};

type();



