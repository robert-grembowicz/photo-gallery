export function init(e) {

    // console.log(e);
    const element = document.querySelector(e);

    const div = document.createElement('div');
    div.classList.add('loader');

    const img = document.createElement('img');

    div.appendChild(img);
    element.appendChild(div);
}