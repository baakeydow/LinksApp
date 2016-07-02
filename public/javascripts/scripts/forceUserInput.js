function setKey(tried) {
	var spellit;
	if (tried == '1')
		spellit = ' retry';
	else
		spellit = ' retries'
	var num = prompt('Please find the code to be left alone. ' + tried + spellit + ' left');
	localStorage.setItem('id', num);
}
function forceKey() {
	var urName = prompt("Hey Welcome on this Website let's get started but first You must confirm your nickname");
	while (!urName || urName.length >= 20)
		urName = prompt("Hey just choose a nickname");
	if (!urName)
		urName = 'Work';
	localStorage.setItem('name', urName);
	var myHeading = document.getElementById('tochange1');
	myHeading.innerHTML = 'Development is Cool';
	var center = document.querySelector('h2');
	center.innerHTML = 'Click Here ' + urName;
	if (localStorage.getItem('name') != 'ok')
	{
		for (var i = 1337; i > 0; i -= 1)
		{
			setKey(i);
			if (i == localStorage.getItem('id'))
				break;
		}
		if (localStorage.getItem('id') != i)
			alert("You failed try again");
		else
			alert("so leet...");
	}
	localStorage.setItem('id', null);
	localStorage.setItem('name', null);
}
