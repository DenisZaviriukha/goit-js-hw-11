import getData from './getData';
const form = document.querySelector('form#search-form')
const apiKey = "34511401-bd67d16594b39460c59012a71"
const userRequest = form.searchQuery
const gallery = document.querySelector('.gallery')
const loadMore = document.querySelector('.load-more')
const buttonb = document.querySelector('[type="button"]')
let array = []
let iRender = 1
let iRequest = ""
form.addEventListener('submit', onSubmit)
buttonb.addEventListener('click', onSubmit)

async function onSubmit(e) {
    e.preventDefault()
    userRequestCheck()
}

async function userRequestCheck() {
    if (userRequest.value.trim() !== '') {
        if (iRequest !== userRequest.value.trim()) {
            iRender = 1
            // console.log('новый запрос', iRender)
            gallery.innerHTML = '', array = [], iRequest = userRequest.value
            if (!loadMore.classList.contains('hidden')) {
                loadMore.classList.add('hidden')
                // console.log('спрятал')
            }    
            await render()
        }
        else {
            // console.log('следующая страница', iRender)
            
            return gallery.innerHTML = '', array = [], await render()
        }
    } else {
        gallery.innerHTML = ''
        array = []
        if (!loadMore.classList.contains('hidden')) {
            loadMore.classList.add('hidden')
            // console.log('спрятал')
    }
    }
}

async function render() {
    if (!loadMore.classList.contains('hidden')) {
        loadMore.classList.add('hidden')
        // console.log('спрятал')
    }
    
    const a = await getData(apiKey, userRequest, iRender);

    
    iRender ++
    for (let i = 0; i < a.hits.length; i++) {
        let data = a.hits[i]
        array.push(
            `<div class="photo-card">
                <img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" height="150"/>
                <div class="info">
                    <p class="info-item">
                        <b>Likes ${data.likes}</b>
                    </p>
                    <p class="info-item">
                        <b>Views ${data.views}</b>
                    </p>
                    <p class="info-item">
                        <b>Comments ${data.comments}</b>
                    </p>                        
                    <p class="info-item">
                        <b>Downloads ${data.downloads}</b>
                    </p>
                </div>
            </div>`
        )
    }
    userRequest.value === ""
    gallery.innerHTML = ""
    await loadMore.classList.remove('hidden')
    // console.log('показал')
    // loadMore.classList.remove('hidden')
    // console.log(gallery.innerHTML)
    return gallery.innerHTML = array.join('')
}