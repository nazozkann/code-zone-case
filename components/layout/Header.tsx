"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 z-10000 w-full h-[80px] flex items-center border-b border-[var(--color-text-nums)] border-[1px] bg-[rgba(18,18,18,0.10)] backdrop-blur-[24px]">
      <div className="flex w-full items-center justify-between md:pl-[84px] pl-[18px] md:pr-[80.62px] pr-[18px]">
        <div className="flex items-center">
          <Link href="/" aria-label="Anasayfa" className="flex items-center">
            {/* Desktop logo */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={235.43844604492188}
              height={59.144798278808594}
              className="hidden md:block"
              priority
            />
            {/* Mobile logo */}
            <Image
              src="/images/logo.png"
              alt="Logo"
              width={182.79296875}
              height={45.91972732543945}
              className="md:hidden block"
              priority
            />
          </Link>
          <nav className="hidden md:flex">
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
          <div className="hidden md:block">
            <Image
              src="/images/search-icon.svg"
              alt="Search"
              width={22.99967384338379}
              height={21.999746322631836}
            />
          </div>
          <button className="hidden md:block ml-[35.83px] bg-[var(--color-text-primary)] text-[var(--color-bg)] pl-[27px] pr-[26px] pt-[14px] pb-[12px] text-[14px] font-[700] leading-[100%] whitespace-nowrap">
            Giriş Yap
          </button>
        </div>
        {/* Mobile */}
        <button
          type="button"
          aria-label="Menüyü aç/kapat"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 cursor-pointer"
        >
          {open ? (
            <span className="inline-block text-[48px] leading-none text-[var(--color-primary)]">
              ×
            </span>
          ) : (
            <Image
              src="/images/hamburger.svg"
              alt="hamburger menu"
              width={31}
              height={10}
            />
          )}
        </button>
      </div>
      {/* Mobile slide-down menü */}
      {open && (
        <div className="md:hidden fixed left-0 right-0 top-[80px] bg-[var(--color-bg)] backdrop-blur-[24px] opacity-90">
          <nav className="px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/search-icon.svg"
                  alt="Ara"
                  width={20}
                  height={20}
                />
                <span className="text-[13px] text-[var(--color-text-primary)]/80">
                  Ara
                </span>
              </div>
              <button
                className="bg-[var(--color-text-primary)] text-[var(--color-bg)] px-4 py-2 text-[14px] font-[700] leading-[100%] rounded"
                onClick={() => setOpen(false)}
              >
                Giriş Yap
              </button>
            </div>

            {/* Linkler */}
            <ul className="flex flex-col gap-8 divide-y divide-[var(--color-text-nums)] text-[14px] font-[400] leading-[100%]">
              {[
                { href: "/haberler", label: "Haberler" },
                { href: "/etkinlikler", label: "Etkinlikler" },
                { href: "/müzikler", label: "Müzikler" },
                { href: "/videolar", label: "Videolar" },
                { href: "/iletişim", label: "İletişim" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
