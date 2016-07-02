function loadScript(url, callback) {
	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	// There are several events for cross browser compatibility.
	script.onreadystatechange = callback;
	script.onload = callback;
	// Fire the loading
	head.appendChild(script);
}
function enigmeOnClick(num) {
	document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('tochange1');
	link.addEventListener('click', function() {
			loadScript('/scripts/forceUserInput.js', setKey(num));
		});
	});
}
function toggleSidebar() {
	document.addEventListener('DOMContentLoaded', function() {
	var link = document.getElementById('sidebar-wrapper');
	link.addEventListener('click', function() {
			$("#wrapper").toggleClass("toggled");
		});
	});
}
// let it shine
function bounceUp() {
	document.addEventListener('DOMContentLoaded', function() {
	var frame = document.getElementById('hidden');
	frame.addEventListener('click', function() {
		document.getElementById('hidden').style.border = '5px solid white';
		document.getElementById('list').style.background = 'transparent'
		document.getElementById('hidden').style.background = '#FFFFFF';
		$(frame).animateCssOnce('fadeInUp');
		var frame = document.getElementById('hidden');
		$(frame).animateCss('rubberBand');
		});
	});
}
function textAnim(classe, effect) {
	document.addEventListener('DOMContentLoaded', function() {
	var txt = document.querySelector(classe);
	txt.addEventListener('click', function() {
		$(txt).animateCss(effect);
		});
	});
}
function textChangeOnClick(id, text) {
	document.addEventListener('DOMContentLoaded', function() {
	var txt = document.getElementById(id);
	txt.addEventListener('click', function() {
		txt.innerHTML = text;
		});
	});
}
function imageSwitcher() {
	document.addEventListener('DOMContentLoaded', function() {
	var myImage = document.querySelector('img');
	myImage.addEventListener('click', function() {
		var mySrc = myImage.getAttribute('src');
		if (mySrc === 'images/firefox2.png') {
			myImage.setAttribute ('src','images/firefox-icon.png');
		} else {
			myImage.setAttribute ('src','images/firefox2.png');
		}
		});
	});
}
function firePage(locationId, page, id) {
	document.addEventListener('DOMContentLoaded', function() {
	var elem = document.getElementById(id);
	elem.addEventListener('click', function() {
		loadPage_(page, locationId);
		});
	});
}
function loadPage_(page, id){
	var test_page   = page;
	var content_div = document.getElementById(id);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.onreadystatechange = function() {
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
			content_div.innerHTML = xmlHttp.responseText;
	}
	xmlHttp.open("GET", test_page, true); // true for asynchronous
	xmlHttp.send(null);
}
$("#menu-toggle").click(function(e) {
	e.preventDefault();
	$("#wrapper").toggleClass("toggled");
});
