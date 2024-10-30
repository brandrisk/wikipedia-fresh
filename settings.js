const form = document.querySelector('#settings');
const fontInput = document.querySelector('#font');
const scrollButtonToggle = document.querySelector('#scroll-button-toggle');
const cleanCopyToggle = document.querySelector('#clean-copy-toggle');
const saveInfo = document.querySelector('#save-info');

browser.storage.local.get(['cleanCopy', 'scrollButton', 'font']).then((res) => {
    console.log(res)
    if (res.cleanCopy != undefined) {
        cleanCopyToggle.setAttribute('x-wk-on', res.cleanCopy);
    }
    
    if (res.scrollButton != undefined) {
        scrollButtonToggle.setAttribute('x-wk-on', res.scrollButton);
    }

    if (res.font != undefined) {
        font.value = res.font;
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

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const scrollButtonValue = getToggleValue('scroll-button-toggle');
    const cleanCopyValue = getToggleValue('clean-copy-toggle');

    const data = {
        scrollButton: scrollButtonValue,
        cleanCopy: cleanCopyValue,
        font: fontInput.value,
    }

    console.log(data);
    browser.storage.local.set(data).then((res) => {
        saveInfo.style.display = 'block';
    });
});

function getToggleValue(id) {
    return document.querySelector(`#${id}`)?.getAttribute('x-wk-on') == "true" ? true : false;
}