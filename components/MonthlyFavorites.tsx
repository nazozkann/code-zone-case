"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import posts from "@/data/posts.json";

type Post = {
  _id: string;
  attributes: {
    slug: string;
    img: string;
    songTitle: string;
    songAuthor: string;
    songRank: number;
  };
};

export default function MonthlyFavorites() {
  const items = (posts as Post[])
    .filter((p) => typeof p?.attributes?.songRank === "number")
    .sort((a, b) => a.attributes.songRank! - b.attributes.songRank!)
    .slice(0, 10);

  return (
    <section className="relative w-full">
      {/* Slider */}
      <div className="mt-8 px-[80.58px]">
        <Swiper
          modules={[Scrollbar]}
          scrollbar={{ draggable: true }}
          spaceBetween={5}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
          }}
          className="!pb-[48px]"
        >
          {items.map((post) => {
            const { slug, img, songTitle, songAuthor, songRank } =
              post.attributes;
            return (
              <SwiperSlide key={post._id}>
                <Link
                  href={`/icerik/${slug}`}
                  className="block"
                  aria-label={`${songAuthor} - ${songTitle}`}
                >
                  <div className="relative flex flex-col justify-between w-[272px] h-[266.0712585449219px] bg-[var(--color-text-nums)] overflow-hidden">
                    <div className="flex mt-[48px]">
                      <div className="w-[184.73px] h-[184.73px] origin-left rotate-[-9.48deg] translate-x-[-35%] rounded-[7.86px] z-10">
                        <Image
                          src={img}
                          alt={`${songAuthor} - ${songTitle}`}
                          fill
                          className="object-cover object-center"
                        />
                      </div>

                      <div className="flex flex-col items-center mt-[-24px] justify-center mr-[20px] justify-center">
                        {songRank != null && (
                          <div className="text-[16px] font-[400] tracking-[1.5px] leading-[104%] text-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] rounded-[65px] w-[135px] h-[27px] flex items-center justify-center gap-1">
                            Top 10{" "}
                            <span className="font-[700]">
                              ({songRank}. Sıra)
                            </span>
                          </div>
                        )}

                        {/* Alt bilgi */}
                        <div className="flex flex-col items-center justify-center text-center mt-[20px]">
                          <div className="text-[20px] font-[400] text-[var(--color-text-secondary)] leading-[104%]">
                            {songAuthor}
                          </div>
                          <div className="text-[20px] mt-2 font-[700] leading-[104%] text-[var(--color-text-primary]">
                            {songTitle}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-[80px]">
                      <Image
                        src="/images/effect-dark-yellow.svg"
                        alt="yellow effect dark"
                        width={272}
                        height={182.25}
                        className="absolute top-0 left-0 object-cover z-2"
                      />
                      <div className="w-full h-[61px] bg-[var(--color-text-nums)] z-3 absolute top-0 left-0"></div>
                      <Image
                        src="/images/effect-light-yellow.svg"
                        alt="yellow effect light"
                        width={272}
                        height={47.96}
                        className="absolute top-9.5 left-0 object-cover z-10"
                      />
                      <div className="w-full h-[80px] bg-[var(--color-bg)] z-1 absolute top-10 left-0"></div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Swiper scrollbar renkleri */}
      <style jsx global>{`
        .swiper .swiper-scrollbar {
          background: var(--color-lines);
          height: 4px;
          border-radius: 9999px;
          max-width: 626.482421875px;
        }
        .swiper .swiper-scrollbar-drag {
          background: var(--color-primary);
          border-radius: 9999px;
          cursor: pointer;
          max-width: 626.482421875px;
        }
      `}</style>
    </section>
  );
}
