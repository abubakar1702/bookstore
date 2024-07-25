import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-cards';
import '../style/style.css';
import { EffectCards } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { FaArrowRightLong } from "react-icons/fa6";

const Banner = () => {
    return (
        <div className="flex flex-col md:grid md:grid-cols-2 bg-red-400 h-auto md:h-96 py-10 items-center">
            <div className="flex mx-10 items-center justify-center">
                <Swiper
                    effect={'cards'}
                    grabCursor={true}
                    modules={[EffectCards]}
                    className="mySwiper"
                >
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                    <SwiperSlide></SwiperSlide>
                </Swiper>
            </div>
            <div className="px-4 text-center md:text-left mt-4">
                <blockquote className="italic">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl py-2">&quot;A Reader Lives a Thousand Lives Before He Dies&quot;</h1>
                    <footer className="text-lg mt-2">— George R. R. Martin</footer>
                    <Link to="/books"><p className="text-xl sm:text-2xl py-2">Discover a world of stories, knowledge, and adventure <FaArrowRightLong /></p></Link>
                </blockquote>
            </div>
        </div>
    );
}

export default Banner;
