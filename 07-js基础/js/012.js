
window.onload = function(){
	function toBecameColor(){
		var oBox = document.getElementById('box');
		oBox.style.backgroundColor = 'red';
	}
	var oBtn = document.getElementById('btn');
	oBtn.onclick = toBecameColor;
}