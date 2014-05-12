function HELLO(){
	this.draw = function(){
		c.style.cursor= 'hand';

		cxt.fillStyle = "#000";
		cxt.fillRect(0,0,c.width,c.height);
		var gradient=cxt.createLinearGradient(0,c.height/2-35,0,c.height/2+35);
		gradient.addColorStop("0","#fff");
		gradient.addColorStop("1.0","#777");
		cxt.fillStyle = gradient;

		cxt.font = "80px Arial Black";
		cxt.fillText("ArmGo",c.width/2-150,c.height/2);
	
		cxt.font = "20px Arial Black";
		cxt.fillText("click here",c.width/2-60,c.height/2+50);
	}
}