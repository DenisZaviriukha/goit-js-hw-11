import axios from 'axios';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
export default async function getData(key, request, i) {
    try {
        const res = await axios.get(`https://pixabay.com/api/?key=${key}&q=${request.value}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${i}`)
        const picks = await res.data
        if (40 <= i * 40 - picks.totalHits) {
            // console.log(picks.totalHits)
            // console.log(i * 40 - picks.totalHits)
            return Notify.info("We're sorry, but you've reached the end of search results.")
        }
        if (picks.total === 0) {
            console.log(picks.total)
            return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        }
        else {
            // console.log(picks.total)
            // console.log(i * 40 - picks.totalHits)
            return picks
        }
    } catch (error) {
        return console.log(error)
    }
}
