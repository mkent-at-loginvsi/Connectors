//Path=/logon/LogonPoint/tmindex.html

function setInputValueById(id, value) {
	console.log(`Setting input \"${id}\" to \"${value}\"`);
	uwc.dom.waitForElement(() => document.getElementById(id)).then(input => {
		if (input != null) {
			input.focus();
			input.click();
			input.value = value;
			input.dispatchEvent(new Event('input', {bubbles:true}));
		}
		else {
			console.warn(`Unable to get element "${id}"`);
		}
	});

}

setInputValueById('login', '${username}');
setInputValueById('passwd', '${password}');
uwc.dom.waitForElement(() => document.getElementById('loginBtn')).then(element => {
	element.click();
});
