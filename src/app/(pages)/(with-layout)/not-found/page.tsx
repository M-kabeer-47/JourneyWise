import Image from "next/image";
export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className=" ">
        <Image
          src="/illustrations/not-found.png"
          alt="Not Found"
          width={800}
          height={800}
        />
      </div>
    </div>
  );
}
