export function init(element, start, end){

    const gallery = document.querySelector('.gallery-hld');

    function images(e){

        let counter = 1;
        
        const section = document.createElement('section');
        section.classList.add('gallery');
        section.classList.add('loading');

        for(let i = start; i < end; i++){

            const div = document.createElement('div');
            div.classList.add('gallery--item');
            div.classList.add(`gallery--item-${counter}`);

            let url = e[i].large_url;
            
            div.dataset.url = url;

            const img = document.createElement('div');
            img.classList.add('gallery--item-img');
            img.style.backgroundImage = `url(${e[i].url})`;
            img.title = 'picture of a tree';

            const span = document.createElement('span');
            span.classList.add('gallery--item-text');
            span.innerText = `#${e[i].site}`;

            div.appendChild(img);
            div.appendChild(span);

            section.appendChild(div);

            counter++;

            if(end - start < 10) {
                section.classList.add(`gallery--${end - start}`);
            }

        }

        let urlImg = e[0].url;

        function loadImage(url) {
            return new Promise((resolve, reject) => {
                let img = new Image();
                img.addEventListener('load', () => resolve(img));
                img.src = url;
            });
        }

        function removeClass(){
            const gallery = document.querySelector('.gallery.loading');
            const buttonShow = document.querySelector('.js-show-more');
            gallery.classList.remove('loading');
            buttonShow.classList.remove('loading');
            if(buttonShow.classList.contains('invisible')) {
                buttonShow.classList.remove('invisible');
            }
        }
        
        loadImage(urlImg)
        .then(removeClass)
        .catch(removeClass)

        gallery.appendChild(section);

    }

    images(element);


}