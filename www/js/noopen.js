function login(){
    var inputN = document.getElementsByTagName('input')[0].value;
    var inputP = document.getElementsByTagName('input')[1].value;
    if (!(inputN == 'admin' && inputP == 'admin') ){
    	var backtrop = document.getElementById('backtrop');
    	backtrop.style.visibility = "visible";
      	return false;
    };
  }
function hide(){
	var backtrop = document.getElementById('backtrop');
    	backtrop.style.visibility = "hidden";
}