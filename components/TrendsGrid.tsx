import Link from "next/link";
import { getTrendPosts } from "@/lib/data";
import Image from "next/image";

export default function TrendsGrid() {
  const items = getTrendPosts(6);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-[20px]">
      {items.map((post, i) => {
        const n = i + 1;
        const { title, authors, slug } = post.attributes;

        return (
          <article
            key={post._id}
            className="group relative flex items-start gap-[40px] md:gap-[64px]"
          >
            <div className="leading-none text-[60px] text-[var(--color-text-nums)] font-[700]">
              0{n}
            </div>
            <div>
              <div className="mt-2 flex items-center gap-3 text-sm text-[var(--color-text-secondary)]">
                <div className="relative h-[32.7431640625px] w-[32.7431640625px] overflow-hidden rounded-[10px]">
                  <Image
                    src="/images/author-image.png"
                    alt="Author"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <span className="text-[14px] font-[700] text-[var(--color-text-primary)]">
                  {authors?.join(", ")}
                </span>
              </div>
              <h3 className="mt-[18.29px] text-[20px] md:text-[25px] font-[700] leading-[104%] w-[244.47314453125px] md:w-[313.75927734375px] h-[78px]">
                {title}
              </h3>

              <hr className="my-5 border-[var(--color-lines)]" />

              <div className="mt-[22.17px]">
                <Link
                  href={`/blog/${slug}`}
                  className="text-[16px] font-[400] leading-[120%]text-[var(--color-text-primary)]"
                >
                  Daha Fazla Oku
                </Link>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
