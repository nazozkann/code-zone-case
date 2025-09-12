"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { useState, useRef } from "react";
import type { Swiper as SwiperType } from "swiper/types";

const slides = [
  {
    id: 1,
    image: "/images/slide1.png",
    title: "DÜNYA RAP TRENDLERİNİ KONUŞUYORUZ.",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ",
  },
  {
    id: 2,
    image: "/images/slide2.png",
    title: "TÜRKÇE RAP VE DÜNYA MÜZİK HABERLERİNİ TAKİP ET",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ",
  },
];

export default function Home() {
  const [activeDot, setActiveDot] = useState(0);
    const swiperRef = useRef<SwiperType | null>(null);

 const handleNext = () => {
    setActiveDot(d => (d + 1) % 6);
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    setActiveDot(d => (d + 6 - 1) % 6);
    swiperRef.current?.slidePrev();
  };
  return (
    <div className="relative w-screen h-screen">
      <button
        onClick={handlePrev}
        aria-label="Önceki"
        className="cursor-pointer absolute left-[57.26px] top-1/2 z-20 -translate-y-1/2 rounded-full "
      >
        <Image
          src="/images/arrow-left.svg"
          alt="Önceki"
          width={24}
          height={24}
          className="m-3"
        />
      </button>
      <button
        onClick={handleNext}
        aria-label="Sonraki"
        className="cursor-pointer absolute right-[57.26px] top-1/2 z-20 -translate-y-1/2 rounded-full "
      >
        <Image
          src="/images/arrow-right.svg"
          alt="Sonraki"
          width={24}
          height={24}
          className="m-3"
        />
      </button>
      <Swiper modules={[Navigation]} 
      navigation={false} 
      loop 
      className="h-full w-full"
      onSwiper={(sw) => { swiperRef.current = sw; }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Slide Content */}
            <div className="relative h-full w-full">
              {/* Background Image */}
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />

              {/* Text Overlay */}
              <div className="absolute inset-0 mr-[140.02px] left-[55%] flex flex-col justify-center text-left text-[var(--color-bg)] ">
                <h2 className="max-w-[482px] text-[60.1px] font-[700] leading-[110.00000000000001%] tracking-[-2%]">
                  {slide.title}
                </h2>
                <p className="mt-[23.13px] max-w-[458.2890625px] text-[16px] leading-[120%] tracking-[1.5%]">{slide.desc}</p>
                <button className="relative mt-[31.91px] w-[136.83px] h-[38.84px] flex items-center justify-center cursor-pointer">
                  <Image
                    src="/images/button-bg.svg"
                    alt="button background"
                    fill
                    className="object-contain"
                  />
                  <span className="relative z-1000 text-[var(--color-bg)] font-[700] text-[14px] leading-[100%]">
                    Devamını Oku
                  </span>
                </button>
                <div className="mt-4 flex items-center gap-[8px]">
                  {Array.from({ length: 6 }).map((_, i) => {
                    const isActive = i === activeDot;
                    const size = isActive ? 11.824467658996582 : 6.630352020263672;
                    const bg = isActive
                      ? "var(--color-primary)"
                      : "var(--color-circle-bg)";
                    return (
                      <div
                        key={i}
                        className="rounded-full"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                          backgroundColor: bg,
                        }}
                        aria-label={`indicator ${i + 1}`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
