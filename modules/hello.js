/*
	Class	欢迎界面

*/

function HELLO() {
	this.draw = function() {
		canvas.style.cursor = 'hand';

		// cxt.fillStyle = "#000";
		// cxt.fillRect(0, 0, canvas.width, canvas.height);
		// var gradient = cxt.createLinearGradient(0, canvas.height / 2 - 35, 0, canvas.height / 2 + 35);
		// gradient.addColorStop("0", "#fff");
		// gradient.addColorStop("1.0", "#777");
		// cxt.fillStyle = gradient;

		// cxt.font = "80px Arial Black";
		// cxt.fillText("ArmGo", canvas.width / 2 - 150, canvas.height / 2);

		// cxt.font = "20px Arial Black";
		// cxt.fillText("click here", canvas.width / 2 - 60, canvas.height / 2 + 50);

		var img = new Image();
		img.src='img/hello.jpg'

		setTimeout(function(){
			cxt.drawImage(img, 0, 0)
		},10)

		
	}
}