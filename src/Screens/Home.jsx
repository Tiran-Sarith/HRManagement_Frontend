

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./styles.css"; // Import the custom CSS file

import slide1image from "./Assests/01.jpeg";
import slide2image from "./Assests/02.jpeg";
import slide3image from "./Assests/03.jpg";
import slide4image from "./Assests/04.jpg";

function Home() {
  return (
    <div id="app">
      <Swiper
        spaceBetween={50}
        centeredSlides={true}
        autoplay={{
          delay: 9000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
       

       
<div className="font-sans">
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide1image} alt="Slide 1" className="object-cover w-full h-full" />
            <div className="absolute h-full p-4 text-left justify-start min-w-full text-white transform -translate-y-1/2 bg-white bg-opacity-30 rounded w-[500px] top-1/2">
              <div className="absolute w-[500px] h-full p-4 mt-20 -translate-y-1/2 top-1/2">
                <h2 className="mb-2 space-x-4 text-5xl font-extrabold leading-snug tracking-wide ">Toether, we build <span className="text-green-600">impactful</span> tech!</h2>
              <p className="mt-10 mb-4 space-y-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
              <button className="px-8 py-2 mt-5 text-white bg-green-700 rounded hover:bg-green-800">
                Explore
              </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide2image} alt="Slide 2" className="object-cover w-full h-full" />
            <div className="absolute h-full p-4 text-left justify-start min-w-full text-white transform -translate-y-1/2 bg-white bg-opacity-30 rounded w-[500px] top-1/2">
              <div className="absolute w-[500px] h-full p-4 mt-20 -translate-y-1/2 top-1/2">
                <h2 className="mb-2 space-x-4 text-5xl font-extrabold leading-snug tracking-wide ">Toether, we build <span className="text-green-600">impactful</span> tech!</h2>
              <p className="mt-10 mb-4 space-y-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
              <button className="px-8 py-2 mt-5 text-white bg-green-700 rounded hover:bg-green-800">
                Explore
              </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide3image} alt="Slide 3" className="object-cover w-full h-full" />
            <div className="absolute h-full p-4 text-left justify-start min-w-full text-black transform -translate-y-1/2 bg-white bg-opacity-30 rounded w-[500px] top-1/2">
              <div className="absolute w-[500px] h-full p-4 mt-20 -translate-y-1/2 top-1/2">
                <h2 className="mb-2 space-x-4 text-5xl font-extrabold leading-snug tracking-wide ">Toether, we build <span className="text-green-600">impactful</span> tech!</h2>
              <p className="mt-10 mb-4 space-y-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
              <button className="px-8 py-2 mt-5 tracking-wide text-white bg-green-700 rounded hover:bg-green-800">
                Explore
              </button>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide4image} alt="Slide 4" className="object-cover w-full h-full" />
            <div className="absolute h-full p-4 text-left justify-start min-w-full text-white transform -translate-y-1/2 bg-white bg-opacity-30 rounded w-[500px] top-1/2">
              <div className="absolute w-[500px] h-full p-4 mt-20 -translate-y-1/2 top-1/2">
                <h2 className="mb-2 space-x-4 text-5xl font-extrabold leading-snug tracking-wide ">Toether,we build <span className="text-green-600">impactful</span> tech!</h2>
              <p className="mt-10 mb-4 space-y-4 text-lg">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. Duis cursus, mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.</p>
              <button className="px-8 py-2 mt-5 text-white bg-green-700 rounded hover:bg-green-800">
                Explore
              </button>
              </div>
            </div>
          </div>


        </SwiperSlide>



        {/* <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide2image} alt="Slide 2" className="object-cover w-full h-full" />
            <div className="absolute max-w-sm p-4 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-md top-1/2 left-5">
              <h2 className="mb-2 text-2xl">Your Title Here</h2>
              <p className="mb-4 text-lg">Your content goes here.</p>
              <button className="px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide3image} alt="Slide 3" className="object-cover w-full h-full" />
            <div className="absolute max-w-sm p-4 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-md top-1/2 left-5">
              <h2 className="mb-2 text-2xl">Your Title Here</h2>
              <p className="mb-4 text-lg">Your content goes here.</p>
              <button className="px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="relative flex items-center justify-center w-full h-full">
            <img src={slide4image} alt="Slide 4" className="object-cover w-full h-full" />
            <div className="absolute max-w-sm p-4 text-white transform -translate-y-1/2 bg-black bg-opacity-50 rounded-md top-1/2 left-5">
              <h2 className="mb-2 text-2xl">Your Title Here</h2>
              <p className="mb-4 text-lg">Your content goes here.</p>
              <button className="px-4 py-2 text-white bg-green-700 rounded hover:bg-green-800">
                Learn More
              </button>
            </div>
          </div>
        </SwiperSlide> */}


</div>
      </Swiper>

      <h1 className="mt-10 text-4xl font-extrabold text-center text-green-800 hover:text-yellow-500">
        HR Management Tool
      </h1>
    </div>
  );
}

export default Home;

