browser.storage.local.get(['font', 'scrollButton', 'cleanCopy', 'justRead', 'stickyTables']).then((res) => {
    // default false

    if (res.font) {
        addFont(res.font);
    }

    if (res.scrollButton) {
        attachScrollButton();
    }
    
    
    // default true
    
    if (res.cleanCopy != false) {
        cleanCopy();
    }
    
    if (res.stickyTables != false) {
        stickyTables();
    }
    
    if (res.justRead != false) {
        justRead();
    }
});


function cleanCopy() {
    attachStyle(`
    sup.reference, sup.noprint, span.noprint {
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
    }`);
}

function attachScrollButton() {
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

    function handleResize() {
        if (window.innerWidth < 1120) {
            sttButton.style.display = 'flex';
        } else {
            sttButton.style.display = 'none';
        }
    }

    function handleScroll() {
        if (window.scrollY == 0) {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m8.5.5-4 4-4-4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        } else {
            sttButton.innerHTML = `<svg height="21" viewBox="0 0 21 21" width="21" xmlns="http://www.w3.org/2000/svg"><path d="m.5 4.5 4-4 4 4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" transform="translate(6 8)"/></svg>`;
        }
    }
}

function justRead() {
    attachStyle(`
        .vector-header-container,
        .vector-page-toolbar,
        .vector-body-before-content,
        a.mw-logo span.mw-logo-container,
        a.cdx-button.search-toggle,
        .mw-editsection {
            display: none;
        }

        .mw-logo {
            min-width: fit-content;
        }
            
        .vector-feature-main-menu-pinned-disabled .mw-logo {
            margin-left: 0;
        }

        .vector-search-box {
            flex-grow: unset;
        }
            
        .vector-search-box .vector-typeahead-search-container {
            margin-right: 0;
        }

        .client-js .vector-search-box.vector-search-box-auto-expand-width {
            margin-left: 0;
        }

        .cdx-typeahead-search--show-thumbnail.cdx-typeahead-search--auto-expand-width:not(.cdx-typeahead-search--expanded) {
            margin-left: 0;
        }

        .infobox,
        figure,
        .mw-parser-output .sidebar,
        .mw-parser-output .navbox,
        .catlinks,
        .mw-parser-output .ambox,
        div.thumbinner,
        .thumbimage,
        .mw-parser-output .side-box,
        .mw-parser-output .portalborder,
        .mw-parser-output .spoken-wikipedia,
        .mw-parser-output .sister-bar,
        .mw-parser-output .quotebox,
        .mw-parser-output .mp-box,
        .mp-h2 {
            border: none !important;
            border-radius: 5px !important;
        }

        figcaption {
            border: none !important;
            border-radius: 5px;
        }
        
        .mw-heading1, h1, .mw-heading2, h2 {
            border: none !important;
        }

        img {
            border-radius: 5px;
        }

        .vector-page-titlebar::after {
            background-color: unset !important;
        }

        .wikitable > tr > th, .wikitable > tr > td, .wikitable > * > tr > th, .wikitable > * > tr > td {
            border: none;
        }

        .wikitable {
            border-radius: 5px;
            overflow: hidden;
            border: none;
            border-collapse: unset;
        }

        .cdx-button.cdx-button--fake-button cdx-button--size-large.cdx-button--fake-button--enabled {
            border: none;
            border-radius: 5px;
        }

        .cdx-search-input--has-end-button {
            border: none;
            gap: 5px;
        }

        .cdx-text-input__input,
        .cdx-text-input__input:enabled,
        .cdx-text-input__input:enabled:focus,
        .cdx-text-input__input:hover {
            border: none;
            outline: none;
            box-shadow: none;
            border-radius: 5px;
        }

        .cdx-button:enabled, .cdx-button.cdx-button--fake-button--enabled {
            border: none;
            border-radius: 5px;
        }

        .cdx-button.cdx-search-input__end-button {
            box-shadow: 0 0 1px grey;
        }

        .cdx-menu {
            border-radius: 5px;
            box-shadow: 0 0 1px grey;
            overflow: hidden;
            border: none;
            margin-top: 5px;
        }
            
        .cdx-typeahead-search__menu.cdx-menu {
            border-radius: 5px;
        }

        table {
            border-radius: 5px;
        }

        .cdx-search-input__input-wrapper {
            box-shadow: 0 0 1px grey;
            border-radius: 5px;
        }

        nav.vector-appearance-landmark:not(:has(.vector-appearance)) {
            display: none;
        }

        .vector-pinnable-header-toggle-button {
            border-radius: 5px;
        }

        .mw-parser-output .ambox .mbox-image,
        .mw-parser-output .portalbox-image,
        .mw-parser-output .sidebar-image {
            display: none;
        }

        table {
            overflow: hidden;
        }

        `);

    const searchBar = document.querySelector('#p-search');
    const logo = document.querySelector('header a.mw-logo');
    const appearanceBox = document.querySelector('nav.vector-appearance-landmark');

    const container = document.createElement('div');
    container.id = 'x-wk-clean-header';

    container.append(logo);
    container.append(searchBar);
    container.append(appearanceBox);

    document.body.prepend(container);
}

function stickyTables() {
    attachStyle(`
        thead {
            position: sticky;
            top: 0;
        }

        `);

    const tables = document.querySelectorAll('.wikitable');

    for (let table of tables) {
        if (!table.querySelector('thead')) {
            const tbody = table.querySelector('tbody');
            const firstRow = tbody.querySelector('tr');

            if ([...firstRow.children].every(((child) => child.tagName == 'TH'))) {
                firstRow.classList.add('x-wk-sticky-row');
            }
        }
    }
}

function addFont(font) {
    const parts = new URL(font).pathname.split('/');
    const fontPath = parts[parts.length - 1];
    const fontName = fontPath.replaceAll('+', ' ');

    attachStyle(`
        @import url("https://fonts.googleapis.com/css2?family=${fontPath}");
        body, .mw-body h1, .mw-body .mw-heading1, .mw-body-content h1, .mw-body-content .mw-heading1, .mw-body-content h2, .mw-body-content .mw-heading2 {
            font-family: "${fontName}"
        }`);
}

function attachStyle(styleText) {
    const styleElement = document.createElement('style');
    styleElement.textContent = styleText.trim().replaceAll(/[\t\n]/g, '');
    document.body.append(styleElement);
}
