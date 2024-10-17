// import Swiper from 'swiper'; 最小限の機能しか入っていない
import Swiper from 'swiper/bundle'; // 全ての機能が入っている
import 'swiper/css/bundle';

const option = {
    loop: true,
    autoplay: true,
}

const swiper = new Swiper('.mySwiper', option);