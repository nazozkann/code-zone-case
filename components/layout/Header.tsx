import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header
      className="fixed top-0 z-50 w-full h-[80px] flex items-center border-b border-[var(--color-text-nums)] border-[1px] bg-[rgba(18,18,18,0.10)] backdrop-blur-[24px]
"
    >
      <div className="flex w-full items-center justify-between pl-[84px] pr-[80.62px]">
        <div className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={235.43844604492188}
            height={59.144798278808594}
          />
          <nav>
            <ul className="flex gap-6 ml-[96.56px] text-[14px] font-[400] leading-[100%]">
              <li>
                <Link href="/haberler">Haberler</Link>
              </li>
              <li>
                <Link href="/etkinlikler">Etkinlikler</Link>
              </li>
              <li>
                <Link href="/müzikler">Müzikler</Link>
              </li>
              <li>
                <Link href="/videolar">Videolar</Link>
              </li>
              <li>
                <Link href="/iletişim">İletişim</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex items-center">
          <div>
            <Image
              src="/images/search-icon.svg"
              alt="Search"
              width={22.99967384338379}
              height={21.999746322631836}
            />
          </div>
          <button className="ml-[35.83px] bg-[var(--color-text-primary)] text-[var(--color-bg)] pl-[27px] pr-[26px] pt-[14px] pb-[12px] text-[14px] font-[700] leading-[100%] whitespace-nowrap">
            Giriş Yap
          </button>
        </div>
      </div>
    </header>
  );
}
