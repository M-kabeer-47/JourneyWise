import Image from "next/image";
import Link from "next/link";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <Image
          src="/illustrations/unauthorized.png"
          alt="Unauthorized Access"
          width={600}
          height={600}
          className="mx-auto mb-8"
        />

        <h1 className="text-4xl font-bold text-midnight-blue mb-4 font-raleway">
          Access Denied
        </h1>

        <p className="sm:text-base text-sm font-medium text-charcoal mb-8 max-w-md mx-auto ">
          You need to be signed in to access this page. Please sign in or return
          to the home page.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            // outline version with border of ocean-blue
          >
            <button className="border-ocean-blue border hover:border-ocean-blue/85 w-[200px] flex items-center justify-center text-ocean-blue font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md">
              Return Home
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-midnight-blue hover:bg-midnight-blue/85 w-[200px] flex items-center justify-center text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md">
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
