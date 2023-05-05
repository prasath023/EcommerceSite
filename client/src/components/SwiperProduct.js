import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default ({data}) => {
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
        className="w-screen "
      >
        {
            data && data.map((image)=>(
                <SwiperSlide><img className="w-full h-full" src={image.imageUrl} alt={image.imageName} /></SwiperSlide>

            ))
        }

       
       
      </Swiper>
    );
  };