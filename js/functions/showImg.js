export function init() {

        const galleryHld = document.querySelector('.gallery-hld');
        const images = [...galleryHld.querySelectorAll('.gallery--item')];
        const body = document.querySelector('body');

        images.forEach(img => {
            img.addEventListener('click', function(){
                let src = img.getAttribute('data-url')
                generatePopup(src);
            })
        });

        function generatePopup(e) {
            // console.log(e);
            
            let div = document.createElement('div');
            div.classList.add('popup');

            let innerDiv = document.createElement('div');
            innerDiv.classList.add('popup--image');

            let img = document.createElement('img');
            img.src = e;

            let span = document.createElement('span');
            span.classList.add('popup--close');

            innerDiv.appendChild(img);
            innerDiv.appendChild(span)

            div.appendChild(innerDiv);
            body.appendChild(div);

            span.addEventListener('click', function(){
                div.parentNode.removeChild(div);
            });

        }
}