var btnGet, fanficitionInput;

[btnGet, fanficitionInput] = [
		document.querySelector('#greeter--btn'),
		document.querySelector('#fanfiction--input')
	];
	

btnGet.addEventListener('click', (e) => console.log(fanficitionInput.value));