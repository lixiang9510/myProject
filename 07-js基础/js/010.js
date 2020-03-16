
function toChange(){
	var oBox = document.getElementById('box');
	oBox.style.width = "200px";
	oBox.style.height = "200px";
	oBox.style.backgroundColor = "blue";
}
var oBtn = document.getElementById('btn');
oBtn.onclick = toChange;