import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Swiper core styles
import "swiper/swiper-bundle.css";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  message: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Jane D",
    role: "CEO",
    avatar: "https://pagedone.io/asset/uploads/1696229969.png",
    rating: 5,
    message:
      "The user interface of this pagedone is so intuitive, I was able to start using it without any guidance.",
  },
  {
    id: "t2",
    name: "Harsh P.",
    role: "Product Designer",
    avatar: "https://pagedone.io/asset/uploads/1696229994.png",
    rating: 5,
    message:
      "I used to dread doing my taxes every year, but pagedone has made the process so much simpler and stress-free.",
  },
  {
    id: "t3",
    name: "Jane D",
    role: "CEO",
    avatar: "https://pagedone.io/asset/uploads/1696229969.png",
    rating: 5,
    message:
      "The user interface of this pagedone is so intuitive, I was able to start using it without any guidance.",
  },
  {
    id: "t4",
    name: "Harsh P.",
    role: "Product Designer",
    avatar: "https://pagedone.io/asset/uploads/1696229994.png",
    rating: 5,
    message:
      "I used to dread doing my taxes every year, but pagedone has made the process so much simpler and stress-free.",
  },
];

const Star = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 18 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
      fill="currentColor"
    />
  </svg>
);

export default function Testimonial() {
  return (
    <section id="testimonial" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
          {/* Left Content */}
          <div className="w-full lg:w-2/5">
            <p className="mb-4 text-xs text-muted-foreground">Testimonial</p>
            <h2 className="text-4xl font-bold text-secondary dark:text-white leading-[3.25rem] mb-8">
              23k+ Customers gave their{" "}
              <span className="text-transparent bg-clip-text bg-primary">
                Feedback
              </span>
            </h2>

            {/* Slider controller buttons */}
            <div className="flex items-center justify-center lg:justify-start gap-10">
              <button
                aria-label="Previous testimonials"
                className="swiper-button-prev group flex justify-center items-center border border-solid border-primary w-12 h-12 transition-all duration-500 rounded-lg hover:bg-secondary"
              >
                <ArrowLeft className="text-primary" />
              </button>

              <button
                aria-label="Next testimonials"
                className="swiper-button-next group flex justify-center items-center border border-solid border-primary w-12 h-12 transition-all duration-500 rounded-lg hover:bg-secondary"
              >
                <ArrowRight className="text-primary" />
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full lg:w-3/5">
            <Swiper
              modules={[Navigation, Pagination]}
              className="mySwiper"
              loop
              centeredSlides={false}
              slidesPerView={2}
              spaceBetween={28}
              pagination={{ el: ".swiper-pagination", clickable: true }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                  centeredSlides: false,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 28,
                  centeredSlides: false,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
            >
              {TESTIMONIALS.map((t) => (
                <SwiperSlide
                  key={t.id}
                  className="group bg-white dark:bg-secondary border border-solid border-muted-foreground shadow-lg rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-6 transition-all duration-500 hover:border-primary my-5"
                >
                  <div className="flex items-center gap-5 mb-5 sm:mb-9">
                    <img
                      className="rounded-full object-cover"
                      src={t.avatar}
                      alt={`${t.name} avatar`}
                    />
                    <div className="grid gap-1">
                      <h5 className="text-secondary dark:text-white font-medium transition-all duration-500">
                        {t.name}
                      </h5>
                      <Badge variant="outline" className="text-sm text-primary">
                        {t.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center mb-5 sm:mb-9 gap-2 text-amber-500 transition-all duration-500">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} />
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground leading-6 transition-all duration-500 min-h-24">
                    {t.message}
                  </p>
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Optional pagination dot container (kept hidden by default since original markup didn't show it) */}
            <div className="swiper-pagination hidden" />
          </div>
        </div>
      </div>
    </section>
  );
}
