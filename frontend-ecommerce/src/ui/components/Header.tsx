"use client"
import Nav from "./nav/Nav";

export const Header = () => {
  return (
    <header className="sticky top-0 z-20 bg-gradient-to-b from-white/50 to-sky-50/30 bg-opacity-60 backdrop-blur-md border-b border-sky-100 w-full">
      <div className="w-full">
        <div className="flex h-16 justify-between gap-4 md:gap-8 w-full">
          <Nav />
        </div>
      </div>
    </header>
  );
}