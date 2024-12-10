// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "./styles.css"; // Import the custom CSS file

import slide1image from "./Assests/Section1.png";

import slide2image from "./Assests/Section 2.png";

function Home() {
  return (
    <div id="app">
      <section className="relative mx-10 my-10 h-[700px] bg-fixed">
        {/* Slide image */}
        <img
          className="object-cover w-full h-full"
          src={slide1image}
          alt="Section 1 Image"
        />

        {/* Centered Text Layer */}
        <div className="absolute inset-0 flex items-center justify-start mx-20">
          <div className="p-4 text-left bg-transparent   max-w-[500px]">
            <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-wide">
              Together, we build{" "}
              <span className="text-green-700">impactful</span> tech!
            </h2>
            <p className="mb-4 text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Suspendisse varius enim in eros elementum tristique. Duis cursus,
              mi quis viverra ornare, eros dolor interdum nulla, ut commodo diam
              libero vitae erat.
            </p>
            <button className="px-10 py-2 mt-5 text-lg text-white bg-green-600 hover:bg-green-800">
              Explore
            </button>
          </div>
        </div>
      </section>

      <section className="relative w-full my-10 bg-zinc-100 ">
        <div className="flex flex-col-2 relative">
          <div className="w-1/2 mt-40 ml-10 mb-20 bg-gray-400">
            <div className="p-6 ml-20 text-left bg-transparent">
              <h2 className="mb-4 text-5xl font-extrabold leading-snug tracking-wide">
                Together, we build{" "}
                <span className="text-green-700">impactful</span> tech!
              </h2>
              <p className="mb-4 text-lg">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse varius enim in eros elementum tristique. Duis
                cursus, mi quis viverra ornare, eros dolor interdum nulla, ut
                commodo diam libero vitae erat.
              </p>
              <ul className="justify-items-center">
                <li className="justify-items-center">a</li>
                <li>b</li>
              </ul>
            </div>
          </div>
          <div className="w-1/2 relative">
            <div className=" object-left">
              <img
                className="transform scale-120"
                src={slide2image}
                alt="Section 2 Image"
              ></img>
            </div>
          </div>
        </div>
      </section>

      <section>
      <div class="grid grid-cols-4 gap-4">
  <div>01</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
  <div>09</div>
</div>
      </section>
    </div>
  );
}
export default Home;
