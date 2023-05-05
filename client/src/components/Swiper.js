import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import main11 from "../assets/main11.avif"
import main12 from "../assets/main12.webp"
import main13 from "../assets/main13.webp"
import main14 from "../assets/main14.gif"

export default () => {
    return (
      <Swiper
        // install Swiper modules
        modules={[ Pagination , Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        
        // onSwiper={(swiper) => console.log(swiper)}
        // onSlideChange={() => console.log('slide change')}
        className="w-screen h-full "
      >
        <SwiperSlide><img className="w-full object-cover h-full" src={main13} alt="main13" /></SwiperSlide>

        <SwiperSlide><img className="w-full object-cover h-full" src={main11} alt="main11" /></SwiperSlide>
        <SwiperSlide><img className="w-full object-cover h-full" src={main14} alt="main14" /></SwiperSlide>
        <SwiperSlide><img className="w-full object-cover h-full" src={main12} alt="main12" /></SwiperSlide>
       
      </Swiper>
    );
  };