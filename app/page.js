import Image from "next/image";
import Link from "next/link";
import localFont from "next/font/local";


const poppins = localFont({
  src:"./fonts/Poppins-ExtraBold.ttf",
  variable: "--font-poppins",
});

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-2 items-center min-h-[91.5vh] bg-purple-100 text-black px-6 md:px-12 lg:px-20">
  {/* Left Content */}
  <div className="flex flex-col justify-center items-start gap-5 max-w-lg">
    <h1 className={`text-4xl md:text-5xl font-extrabold leading-snug ${poppins.className}`}>
      Shorten Your Links. Simplify Your Life.
    </h1>
    <p className="text-gray-700 text-lg leading-relaxed">
      SnapLink lets you create and manage your own collection of shortened URLs. Each account keeps your links private and organized, with fast shortening and a seamless login experience — no clutter, no tracking you don’t control.
    </p>

    <div className="flex gap-4 mt-4">
      <Link href="/shorten">
        <button className="bg-purple-500 hover:bg-purple-600 text-white font-medium py-2 px-6 rounded-xl transition-all shadow-md">
          Try Now
        </button>
      </Link>
      <Link href="/github">
        <button className="bg-white text-purple-600 border border-purple-500 hover:bg-purple-50 font-medium py-2 px-6 rounded-xl transition-all shadow-md">
          View on GitHub
        </button>
      </Link>
    </div>
  </div>

  {/* Right Image */}
  <div className="relative w-full h-[300px] md:h-[400px] lg:h-[450px] flex justify-center items-center">
    <Image
      alt="URL Shortener Illustration"
      src="/vector.jpg"
      fill
      className="object-contain mix-blend-darken"
    />
  </div>
</main>

  );
}
