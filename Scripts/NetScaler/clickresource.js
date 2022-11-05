//Path=/*Web?

async function Run() {
    while (!uwc.api.hasApiRequestCompleted("*GetUserName*")) {
        uwc.log.info("Waiting for user name retrieval to complete.");
        await uwc.delay(500);
    }
    uwc.log.info("GetUsername API call completed.");

    var desktopsButton = document.getElementById('desktopsBtn');
    while (!desktopsButton) {
        await uwc.delay(500);
        desktopsButton = document.getElementById('desktopsBtn');
    }
    uwc.log.info("Desktops button available. Executing click.");

    desktopsButton.click();

	var resourceElement = await uwc.dom.waitForElement(() => uwc.dom.findElementWithText('p', '${resource}'));
    uwc.log.info("${Resource} link available. Executing click.");

	uwc.settings.download.openFileAfterDownload = true;
	uwc.settings.download.exitAfterFileOpen = true;
    resourceElement.parentElement.previousSibling.click();
    uwc.log.info("Clicked resource. Download is expected to begin.");
}

if (uwc.cookies.getCookieValue("CtxsClientDetectionDone")) {
    Run();
} else {
	// skip the client detection user interaction
	uwc.log.info('Skipping receiver detection.');
	// We need client detection cookies to skip the client detection user interaction
	uwc.cookies.loadCookies('clientcookies.json', true);
    location.reload();
}
