// document.querySelector('header a.mw-logo span.mw-logo-container').remove();
// const searchBox = document.querySelector('#p-search');
// const header = document.querySelector('header.vector-header.mw-header');
// header.parentElement.insertAdjacentElement('afterend', searchBox);

chrome.storage.local.get(['font', 'scrollToTop']).then((res) => {
    if (res.font) {
        addFont(res.font);
    }

    if (res.scrollToTop) {
        attachSttButton();
    }
});

function attachSttButton() {

    const sttButton = document.createElement('div');
    sttButton.id = 'x-wk-stt-button';
    document.body.append(sttButton);

    sttButton.addEventListener('click', () => {
        if (window.scrollY == 0) {
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            window.scrollTo(0, 0);
        }
    });

    handleScroll();

    document.addEventListener('scroll', () => {
        handleScroll();
    });

    handleResize();

    window.addEventListener('resize', () => {
        handleResize();
    });

    function handleResize() {
        if (window.innerWidth < 1120) {
            sttButton.style.display = 'flex';
        } else {
            sttButton.style.display = 'none';
        }
    }

    function handleScroll() {
        if (window.scrollY == 0) {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8.5.5-4 4-4-4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        } else {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 4.5 4-4 4 4" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        }
    }
}

function addFont(font) {
    const styleElement = document.createElement('style');
    const parts = new URL(font).pathname.split('/');
    const fontName = parts[parts.length - 1];
    styleElement.textContent = `@import url("https://fonts.googleapis.com/css2?family=${fontName}");
body, .mw-body h1, .mw-body .mw-heading1, .mw-body-content h1, .mw-body-content .mw-heading1, .mw-body-content h2, .mw-body-content .mw-heading2 {
    font-family: "${fontName.replaceAll('+', ' ')}"
}`;
    document.body.append(styleElement);
}

