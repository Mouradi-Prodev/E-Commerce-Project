import Link from "next/link";

export default function WelcomeBanner() {
  return (
    <section className="relative w-full bg-gradient-to-r from-purple-600 via-indigo-500 to-blue-500 text-white py-16 px-6 md:px-12 lg:px-20 flex flex-col items-center text-center rounded-xl shadow-lg">
      <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
        Welcome to Our Store! 🛍️
      </h1>
      <p className="mt-4 text-lg md:text-xl text-white/90">
        Discover the best deals and latest trends. Shop now and enjoy exclusive discounts!
      </p>
      


      <div className="absolute top-4 left-4 w-10 h-10 bg-white/20 rounded-full animate-ping"></div>
      <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-6 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-6 left-4 w-10 h-10 bg-white/20 rounded-full animate-ping"></div>


    </section>
  );
}
