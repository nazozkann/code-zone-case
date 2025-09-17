"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState, useRef, useMemo } from "react";
import type { Swiper as SwiperType } from "swiper/types";
import TrendsGrid from "@/components/TrendsGrid";
import MonthlyFavorites from "@/components/MonthlyFavorites";
import postsData from "@/data/posts.json";

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
    title: "TÜRKÇE RAP VE DÜNYA MÜZİK HABERLERİNİ TAKİP ET",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ",
  },
];

const filterButtons = [
  "Türk Rap",
  "Yabancı Rap",
  "Rap Haberleri",
  "Haftanın Klipleri",
  "Ayın Klipleri",
  "Rap Sohbetleri",
  "Rap Müsabakaları",
];

const TAG_SYNONYMS: Record<string, string[]> = {
  "Haftanın Klipleri": ["Haftanın Videoları"],
  "Ayın Klipleri": ["Ayın Videoları"],
  "Türk Rap": ["Türk Rap"],
  "Yabancı Rap": ["Yabancı Rap"],
  "Rap Haberleri": ["Rap Haberleri"],
  "Rap Sohbetleri": ["Sohbet", "Podcast"],
  "Rap Müsabakaları": ["Müsabaka", "Battle"],
};

type ApiPost = {
  _id: string;
  createdAt: string;
  attributes: {
    category: string[];
    tags: string[];
    authors: string[];
    title: string;
    slug: string;
    img: string;
    desc?: string;
    trends?: boolean;
  };
};

function matchByButton(item: ApiPost, btn: string) {
  if (btn === "Tümü") return true;

  const wanted = new Set(
    [btn, ...(TAG_SYNONYMS[btn] || [])].map((s) => s.toLowerCase())
  );
  const haystack = [
    ...(item.attributes.category || []),
    ...(item.attributes.tags || []),
  ].map((s) => s.toLowerCase());

  return haystack.some((t) => wanted.has(t));
}

export default function Home() {
  const [activeDot, setActiveDot] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const [selectedFilter, setSelectedFilter] = useState("Türk Rap");

  const filteredData = useMemo(() => {
    return (postsData as ApiPost[]).filter((item) =>
      matchByButton(item, selectedFilter)
    );
  }, [selectedFilter]);

  const posts = useMemo(
    () =>
      (postsData as ApiPost[]).map((p) => ({
        id: p._id,
        title: p.attributes.title,
        slug: p.attributes.slug,
        img: p.attributes.img,
        author: p.attributes.authors?.[0] ?? "Rapkology",
        category: p.attributes.category ?? [],
        tags: p.attributes.tags ?? [],
      })),
    []
  );

  function formatDateTR(iso: string) {
    try {
      const d = new Date(iso);
      const s = d.toLocaleDateString("tr-TR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
      return s.toLocaleLowerCase("tr-TR");
    } catch {
      return iso;
    }
  }

  const handleNext = () => {
    setActiveDot((d) => (d + 1) % 6);
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    setActiveDot((d) => (d + 6 - 1) % 6);
    swiperRef.current?.slidePrev();
  };

  return (
    <main className="overflow-y-hidden w-full">
      <div className="section-1 relative h-screen w-full overflow-y-hidden">
        <button
          onClick={handlePrev}
          aria-label="Önceki"
          className="hidden md:block absolute left-[57.26px] top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full"
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
          className="hidden md:block absolute right-[57.26px] top-1/2 z-20 -translate-y-1/2 cursor-pointer rounded-full"
        >
          <Image
            src="/images/arrow-right.svg"
            alt="Sonraki"
            width={24}
            height={24}
            className="m-3"
          />
        </button>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation={false}
          loop
          autoplay={{
            delay: 3000,
            disableOnInteraction: true,
          }}
          className="h-full w-full"
          onSwiper={(sw) => {
            swiperRef.current = sw;
          }}
          onSlideChange={(sw) => setActiveDot(sw.realIndex)}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative h-full w-full flex md:block flex-col justify-center">
                {/* Background Image */}
                <div className="hidden md:flex">
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-[25%_12%] md:object-center"
                    priority={slide.id === 1}
                  />
                </div>
                <div className="flex flex-col md:hidden h-screen">
                  <div className="w-full h-[25vh]"></div>
                  <div className="relative w-full h-[75vh]">
                    <Image
                      src="/images/mobile-hero.png"
                      alt="hero mobile"
                      fill
                      sizes="100vw"
                      className="object-cover"
                      priority={slide.id === 1}
                    />
                  </div>
                </div>

                {/* Text Overlay */}
                <div className="absolute inset-0 ml-[17%] max-w-[287.03125px] md:max-w-[100%] md:ml-[55%] md:mr-[140.02px] mt-[160px] md:mt-0 flex flex-col md:justify-center text-center items-center md:text-left text-[var(--color-bg)]">
                  <h2
                    className={`max-w-[482px] text-[30px] md:text-[60.1px] font-[700] leading-[110%] tracking-[-0.02em] transition-colors duration-500 ${
                      activeDot === 0
                        ? "text-[var(--color-text-primary)] md:text-[var(--color-bg)]"
                        : "text-white"
                    }`}
                  >
                    {slide.title}
                  </h2>

                  <p
                    className={`mt-[23.13px] max-w-[458.2890625px] text-14px md:text-[16px] leading-[120%] tracking-[0.015em] transition-colors duration-500 ${
                      activeDot === 0
                        ? "text-[var(--color-text-primary)] md:text-[var(--color-bg)]"
                        : "text-white"
                    }`}
                  >
                    {slide.desc}
                  </p>

                  <button className="relative mt-[31.91px] ml-[-0.65rem] flex h-[38.84px] w-[136.83px] cursor-pointer items-center justify-center">
                    <Image
                      src="/images/button-bg.svg"
                      alt="button background"
                      fill
                      sizes="136.84px"
                      className="object-contain"
                    />
                    <span className="relative z-10 text-[14px] font-[700] leading-[100%] text-[var(--color-bg)]">
                      Devamını Oku
                    </span>
                  </button>

                  {/* 6 dots indicator */}
                  <div className="mt-4 hidden md:flex items-center gap-[8px]">
                    {Array.from({ length: 6 }).map((_, i) => {
                      const isActive = i === activeDot;
                      const size = isActive
                        ? 11.824467658996582
                        : 6.630352020263672;
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
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[30000]">
                  <Image
                    src="/images/effect.svg"
                    alt="effect"
                    width={1799.4552596827755}
                    height={553.2002579788975}
                    className="w-full h-auto"
                    priority={false}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="section-2 relative w-full h-screen overflow-x-hidden overflow-y-hidden">
        <div className="absolute left-1/2 top-[25vh] md:top-[30vh] z-[200] -translate-x-1/2 -translate-y-1/2 pointer-events-auto">
          <div className="info flex flex-col items-center text-center rotate-[-3.7deg]">
            <div className="flex items-center gap-[12.79px]">
              <div className="relative w-[214px] h-[122px] md:w-[15.865rem] md:h-[9.77rem] mr-[-3rem] ml-[-2rem] md:ml-0">
                <Image
                  src="/images/twitch-icon.png"
                  alt="twitch-icon"
                  fill
                  className="object-contain"
                  priority={false}
                />
              </div>
              <div className="w-[1px] h-[100px] bg-[var(--color-lines)]"></div>
              <div className="text-left">
                <h2 className="text-[46.29px] md:text-[68.24px] font-[300] text-[var(--color-text-primary)] leading-none">
                  HER HAFTA
                </h2>
                <h2 className="text-[46.29px] md:text-[68.24px] font-[700] text-[var(--color-primary)] leading-none">
                  CANLIDAYIZ!
                </h2>
                <p className="mt-2 text-[10.85px] md:text-[16px] font-[700] text-[var(--color-text-primary)]">
                  Bizi Takip Edin!
                </p>
              </div>
            </div>

            <div className="mt-6 flex gap-[10px] border-[var(--color-lines)] border rounded-[16px] p-[18.75px]">
              <button className="cursor-pointer flex gap-[7px] items-center px-[14px] py-[12px] text-[var(--color-text-primary)] bg-[var(--color-secondary)] font-helvetica text-[14.06px] rounded-[7.03px]">
                <Image
                  src="/images/heart-icon.svg"
                  alt="main image 2"
                  width={15.93}
                  height={13.67}
                  className="object-contain"
                  priority
                />
                <span>Takip Et</span>
              </button>
              <button className="cursor-pointer flex gap-[7px] items-center px-[14px] py-[12px] text-[var(--color-text-primary)] bg-[var(--color-btn-bg)] font-helvetica text-[14.06px] rounded-[7.03px]">
                <Image
                  src="/images/star-icon.svg"
                  alt="main image 2"
                  width={16.5}
                  height={15.69}
                  className="object-contain"
                  priority
                />
                <span>Abone Ol</span>
                <Image
                  src="/images/dropdown-icon.svg"
                  alt="main image 2"
                  width={10.26}
                  height={5.13}
                  className="object-contain"
                  priority
                />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <div className="relative top-1/4 h-1/2 md:h-full w-full left-1/2 -ml-[50vw] md:static md:w-full md:left-auto md:ml-0">
            <Image
              src="/images/main-img-2.png"
              alt="main image 2"
              fill
              className="object-cover md:object-contain"
              priority
            />
          </div>
        </div>

        <div className="relative -mt-[65vh] md:-mt-[80vh] md:px-[7vw] pb-[70px] z-[100] flex w-full items-end justify-between">
          <div className="relative w-[321.96270751953125px] h-[311.8286437988281px] md:w-[419.55487060546875px] md:h-[618.84912109375px]">
            <Image
              src="/images/main-img-1.png"
              alt="main image 1"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="relative w-[221.1492919921875px] h-[387.1092529296875px] md:w-[437.2111511230469px] md:h-[530.6113891601562px]">
            <Image
              src="/images/main-img-3.png"
              alt="main image 3"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        {/* YENİ */}
        <div className="relative w-full h-full flex flex-col z-[150] mt-[-70vh] md:mt-[-79vh]">
          <Image
            src="/images/effect-2.svg"
            alt="main image 2"
            fill
            className="object-contain z-[1]"
            priority
          />

          {/* Altına bitişik 200px şerit */}
          <div
            aria-hidden="true"
            className="block md:hidden absolute inset-x-0 bottom-0 h-[400px] bg-[var(--color-bg)]"
          />
        </div>
      </div>
      <div className="section-3 px-[20px] md:px-[79.34px] py-[89px] relative w-full h-full overflow-x-hidden overflow-y-hidden">
        <div className="flex gap-[20.6px]">
          <h2 className="text-[40px] md:text-[60px] font-[700] text-[var(--color-text-primary)] leading-[89%]">
            TRENDLER
          </h2>
          <Image
            src="/images/trend-icon.svg"
            alt="trend icon"
            width={65.9228515625}
            height={65.9228515625}
            className="object-contain"
            priority
          />
        </div>
        <TrendsGrid />

        <button className="relative mt-[80px] mx-auto flex h-[38.84px] w-[136.83px] cursor-pointer items-center justify-center">
          <Image
            src="/images/white-button.svg"
            alt="button background"
            fill
            sizes="136.84px"
            className="object-contain"
          />
          <span className="relative z-10 text-[14px] font-[700] leading-[100%] text-[var(--color-bg)]">
            Tümünü Gör
          </span>
        </button>
      </div>
      <div className="section-3 w-full h-full overflow-hidden">
        <div className="relative w-[376.48583984375px] h-[88px] md:w-[602.76px] md:h-[126.62px]">
          <Image
            src="/images/youtube-spotify.png"
            alt="Ana görsel"
            fill
            className="object-contain"
          />

          <div className="absolute inset-0 flex items-center justify-center gap-9 -translate-x-6 -translate-y-1">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/youtube-logo.png"
                alt="youtube logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/images/spotify-logo.png"
                alt="spotify logo"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-[200px]">
          <div className="flex flex-col text-left pl-[80.58px] mt-[125px]">
            <h2 className="text-[60px] font-[700] leading-[89%] text-[var(--color-text-primary)]">
              AYIN
            </h2>
            <h2 className="text-[60px] font-[700] leading-[89%] text-[var(--color-text-primary)]">
              FAVORİLERİ
            </h2>
          </div>
          <MonthlyFavorites />
        </div>
      </div>
      <div className="section-4 w-full h-full hidden md:flex flex-row justify-between gap-[132px] px-[80px] py-[96px]">
        <div className="w-[60%]">
          <div className="flex justify-between">
            <div className="flex gap-[26px] items-center">
              <h2 className="text-[60px] font-[700] leaading-[89%]">KEŞFET</h2>
              <Image
                src="/images/compass-icon.svg"
                alt="spotify logo"
                width={53.85400390625}
                height={53.85400390625}
                className="object-contain"
              />
            </div>
            <div className="flex gap-[26.65px]">
              <Image
                src="/images/i-1.svg"
                alt="icon"
                width={22.99967384338379}
                height={22.99967384338379}
                className="object-contain cursor-pointer"
              />
              <Image
                src="/images/i-2.svg"
                alt="icon"
                width={24.003337860107422}
                height={19.257720947265625}
                className="object-contain cursor-pointer"
              />
              <Image
                src="/images/i-3.svg"
                alt="icon"
                width={23.053857803344727}
                height={19.257944107055664}
                className="object-contain cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[82px] mt-[97px]">
            {filteredData.map((item: ApiPost) => (
              <article key={item._id} className="flex items-stretch gap-[20px]">
                {/* Görsel */}
                <div>
                  <div className="relative w-[301.709716796875px] h-[196.81689453125px] flex-shrink-0 overflow-hidden mb-[30px]">
                    <Image
                      src={item.attributes?.img}
                      alt={item.attributes?.title}
                      fill
                      className="object-cover"
                      sizes="240px"
                    />
                  </div>
                  <time
                    className="text-[16px] font-[400] leading-[120%] text-[var(--color-lines)]"
                    dateTime={item.createdAt}
                    title={item.createdAt}
                  >
                    {formatDateTR(item.createdAt)}
                  </time>
                </div>

                {/* Yazı Bloğu */}
                <div className="flex flex-col justify-between w-full">
                  {/* yazarın görseli - yazar */}
                  <div className="flex items-center gap-3">
                    <div className="rounded-[10px] bg-[var(--color-lines)] flex items-center justify-center text-[10px] uppercase tracking-wide">
                      <Image
                        src="/images/author-image.png"
                        alt={item.attributes.authors?.[0] ?? "Yazar"}
                        width={32.7431640625}
                        height={32.7431640625}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-[16px] font-[400] text-[var(--color-text-primary)]">
                      {item.attributes.authors?.[0] ?? "Rapkology"}
                    </span>
                  </div>

                  {/* başlık */}
                  <h3 className="max-w-[392.592041015625px] mt-[30px] text-[25px] font-[700] text-[var(--color-text-primary)]">
                    {item.attributes?.title}
                  </h3>

                  {/* hr */}
                  <hr className="my-[30px] border-[var(--color-lines)]" />

                  {/* daha fazla oku */}
                  <a
                    href={`/yazi/${item.attributes?.slug}`}
                    className="inline-flex items-center text-[16px] font-[400] leading-[120%]"
                  >
                    Daha fazla oku
                  </a>
                </div>
              </article>
            ))}

            {filteredData.length === 0 && (
              <p className="text-sm opacity-70">
                Bu kategoride içerik bulunamadı.
              </p>
            )}
          </div>
        </div>
        <aside className="flex flex-col w-[40%]">
          <h2 className="text-[40px] font-[700] mb-[22.24px]">
            NE GÖRMEK İSTERSİN?
          </h2>
          <div className="flex flex-wrap gap-3">
            {filterButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => setSelectedFilter(btn)}
                className={`px-[20px] py-[10px] text-[16px] font-[400] border border-[1px]
                  ${
                    selectedFilter === btn
                      ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]"
                      : "bg-transparent text-[var(--color-text-primary)] border-[var(--color-text-primary)"
                  }`}
                aria-pressed={selectedFilter === btn}
                aria-label={`${btn} filtresini seç`}
              >
                {btn}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-[48px] mt-[200px]">
            <h3 className="max-w-[349.958740234375px] text-[40px] font-[700] leading-[104%]">
              GELİŞMELERDEN İLK SEN HABERDAR OL!
            </h3>
            <div>
              <div className="flex justify-between mb-[21px]">
                <button className="text-[14px] font-[700] text-[var(--color-text-primary)]">
                  EMAIL
                </button>
                <button className="flex gap-[14px]">
                  <span className="text-[14px] font-[700] text-[var(--color-primary)]">
                    GÖNDER
                  </span>
                  <Image
                    src="/images/right-yellow.svg"
                    alt="Social Media"
                    width={9.6044921875}
                    height={9.6044921875}
                  />
                </button>
              </div>
              <hr className="border-[var(--color-lines)]" />
            </div>
            <div>
              <Image
                src="/images/platform-icons.png"
                alt="Newsletter"
                width={224.4}
                height={36.64}
              />
            </div>
            <div className="flex flex-wrap gap-[56.62px]">
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                HABERLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                ETKİNLİKLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                MÜZİKLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                VİDEOLAR
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                İLETİŞİM
              </button>
            </div>
            <p className="text-[14px] font-[400] text-[var(--color-text-secondary)]">
              © RAPKOLOGY All Rights Are Reserved 2022.
            </p>
          </div>
        </aside>
      </div>
      <div className="section-4-mobile block md:hidden w-full h-full px-[20px] mt-[80px] mb-[40px] flex flex-col">
        <h2 className="text-[30px] font-[700] leading-[104%]">
          NE GÖRMEK İSTERSİN?
        </h2>

        <div className="mt-4">
          <div className="flex flex-nowrap gap-4 overflow-x-auto overflow-y-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterButtons.map((btn) => (
              <button
                key={btn}
                onClick={() => setSelectedFilter(btn)}
                className={`px-[20px] py-[10px] text-[16px] font-[400] border whitespace-nowrap border-[1px]
                  ${
                    selectedFilter === btn
                      ? "bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-primary)]"
                      : "bg-transparent text-[var(--color-text-primary)] border-[var(--color-text-primary)"
                  }`}
                aria-pressed={selectedFilter === btn}
                aria-label={`${btn} filtresini seç`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-10">
          {filteredData.map((item: ApiPost) => (
            <article key={item._id} className="flex flex-col">
              {/* Görsel */}
              <div className="relative w-full aspect-[16/10] rounded-[12px] overflow-hidden">
                <Image
                  src={item.attributes?.img}
                  alt={item.attributes?.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              </div>

              {/* Yazar */}
              <div className="mt-3 flex items-center gap-3">
                <div className="rounded-[10px] bg-[var(--color-lines)] flex items-center justify-center">
                  <Image
                    src="/images/author-image.png"
                    alt={item.attributes.authors?.[0] ?? "Yazar"}
                    width={28}
                    height={28}
                    className="object-cover rounded-[8px]"
                  />
                </div>
                <span className="text-[14px] font-[400] text-[var(--color-text-primary)]">
                  {item.attributes.authors?.[0] ?? "Rapkology"}
                </span>
              </div>

              {/* Başlık */}
              <h3 className="mt-3 text-[20px] font-[700] text-[var(--color-text-primary)]">
                {item.attributes?.title}
              </h3>

              {/* Tarih */}
              <time
                className="mt-2 text-[12px] font-[400] leading-[120%] text-[var(--color-lines)]"
                dateTime={item.createdAt}
                title={item.createdAt}
              >
                {formatDateTR(item.createdAt)}
              </time>

              {/* Daha fazla oku */}
              <a
                href={`/yazi/${item.attributes?.slug}`}
                className="mt-3 inline-flex items-center text-[14px] font-[500] leading-[120%]"
              >
                Daha fazla oku
              </a>

              <hr className="mt-6 border-[var(--color-lines)]" />
            </article>
          ))}

          {filteredData.length === 0 && (
            <p className="text-sm opacity-70">
              Bu kategoride içerik bulunamadı.
            </p>
          )}
        </div>

        {/* Newsletter, olduğu gibi bırakıyoruz */}
        <aside className="flex flex-col mt-[48px]">
          <div className="flex flex-col gap-[32px]">
            <h3 className="text-[25px] font-[700] leading-[104%]">
              GELİŞMELERDEN İLK SEN HABERDAR OL!
            </h3>
            <div>
              <div className="flex justify-between mb-[16px]">
                <button className="text-[14px] font-[700] text-[var(--color-text-primary)]">
                  EMAIL
                </button>
                <button className="flex gap-[10px]">
                  <span className="text-[14px] font-[700] text-[var(--color-primary)]">
                    GÖNDER
                  </span>
                  <Image
                    src="/images/right-yellow.svg"
                    alt="Social Media"
                    width={9.6044921875}
                    height={9.6044921875}
                  />
                </button>
              </div>
              <hr className="border-[var(--color-lines)]" />
            </div>
            <div>
              <Image
                src="/images/platform-icons.png"
                alt="Newsletter"
                width={224.4}
                height={36.64}
              />
            </div>
            <div className="flex flex-wrap gap-[32px]">
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                HABERLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                ETKİNLİKLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                MÜZİKLER
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                VİDEOLAR
              </button>
              <button className="text-[14px] text-[var(--color-text-primary)] font-[400] cursor-pointer">
                İLETİŞİM
              </button>
            </div>
            <p className="text-[14px] font-[400] text-[var(--color-text-secondary)]">
              © RAPKOLOGY All Rights Are Reserved 2022.
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
