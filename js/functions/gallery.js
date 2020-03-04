import * as showImg from './showImg';
import * as generateImages from './generateImages';

export function init() {

    let start = 0;
    let end = 10;
    let activeFilter = false;

    const api = 'http://www.splashbase.co/api/v1/images/search?query=tree';
    
    async function fetchImg() {
        const res = await fetch(api);
        const data = await res.json();
        
        const imagesArray = data.images;
        let filtered = imagesArray;

        // console.table(imagesArray);

        if(activeFilter != false) {
            filtered = imagesArray.filter(el => {
                return el.site == activeFilter;
            });
        }

        // console.log(filtered.length);
        // console.log(`start: ${start} end: ${end}`);

        if(filtered.length <= end) {
            end = filtered.length;
            showMore.deactive();
        }
        else {
            showMore.active();
        }

        // console.log(imagesArray);

        generateImages.init(filtered, start, end);

        showImg.init();
        
        start = end;
        end += 10;
        
    }

    let showMore = {
        button : document.querySelector('.js-show-more'),
        show : function(e) {
            e.preventDefault();
            fetchImg();
        },
        active : function() {
                this.button.classList.add('loading');
                this.button.addEventListener('click', this.show);
                },
        deactive : function() {
                this.button.removeEventListener('click', this.show);
        }
    }

    // function addLoader(){
    //     const gallery = document.querySelector('.gallery-hld');
    //     gallery.classList.add('loading');
    // }

    function filterGallery(){
        const filters = document.querySelectorAll('.filter');
        [...filters].forEach(filter => {
            filter.addEventListener('click', function(e){
                activeFilter = filter.dataset.page;

                const gallery = document.querySelector('.gallery-hld');
                gallery.innerHTML = '';

                const button = document.querySelector('.js-show-more');
                button.classList.add('invisible');

                start = 0;
                end = 10;
                fetchImg();
                // addLoader();
            });
        });
    }

    function startGallery() {
        showMore.active();
        fetchImg();
        filterGallery();
    }

    startGallery();

}