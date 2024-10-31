const form = document.querySelector('#settings');
const fontInput = document.querySelector('#font');
const scrollButtonToggle = document.querySelector('#scroll-button-toggle');
const cleanCopyToggle = document.querySelector('#clean-copy-toggle');
const saveInfo = document.querySelector('#save-info');
const justReadToggle = document.querySelector('#just-read-toggle');
const stickyTablesToggle = document.querySelector('#sticky-tables-toggle');

browser.storage.local.get(['cleanCopy', 'scrollButton', 'font', 'justRead', 'stickyTables']).then((res) => {
    console.log(res)
    if (res.cleanCopy != undefined) {
        cleanCopyToggle.setAttribute('x-wk-on', res.cleanCopy);
    }
    
    if (res.scrollButton != undefined) {
        scrollButtonToggle.setAttribute('x-wk-on', res.scrollButton);
    }

    if (res.justRead != undefined) {
        justReadToggle.setAttribute('x-wk-on', res.justRead);
    }

    if (res.stickyTables != undefined) {
        stickyTablesToggle.setAttribute('x-wk-on', res.stickyTables);
    }

    if (res.font != undefined) {
        fontInput.value = res.font;
    }

});

scrollButtonToggle.addEventListener('click', () => {
    const value = getToggleValue('scroll-button-toggle');
    scrollButtonToggle.setAttribute('x-wk-on', !value);
});

cleanCopyToggle.addEventListener('click', () => {
    const value = getToggleValue('clean-copy-toggle');
    cleanCopyToggle.setAttribute('x-wk-on', !value);
});

justReadToggle.addEventListener('click', () => {
    const value = getToggleValue('just-read-toggle');
    justReadToggle.setAttribute('x-wk-on', !value);
});

stickyTablesToggle.addEventListener('click', () => {
    const value = getToggleValue('sticky-tables-toggle');
    stickyTablesToggle.setAttribute('x-wk-on', !value);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = {
        scrollButton: getToggleValue('scroll-button-toggle'),
        cleanCopy: getToggleValue('clean-copy-toggle'),
        justRead: getToggleValue('just-read-toggle'),
        stickyTables: getToggleValue('sticky-tables-toggle'),
        font: fontInput?.value,
    }

    saveInfo.style.display = 'none';

    browser.storage.local.set(data).then((res) => {
        saveInfo.style.display = 'block';
    });
});

function getToggleValue(id) {
    return document.querySelector(`#${id}`)?.getAttribute('x-wk-on') == "true" ? true : false;
}
