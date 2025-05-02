import Image from "next/image";

export default function PromoBanners() {
  return (
    <div className="flex flex-col md:flex-row gap-4 px-6 py-8">
      <div className="relative bg-[#E7F0FF] rounded-xl px-6 py-4 w-full md:w-1/2 h-52 overflow-hidden flex items-end justify-between">
        <div className="z-10">
          <p className="text-lg font-semibold text-[#0D0D0D] leading-snug">
            Don’t miss out on <br /> getting the best service
          </p>
          <p className="mt-2 text-sm text-[#1A2D7A] font-medium">From ₦3000</p>
        </div>
        <div className="relative w-32 h-32">
          <Image
            src="/images/electrician-cropped.svg"
            alt="Electrician"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-[#3D4E9E] to-[#D3E0FF] rounded-xl px-6 py-4 w-full md:w-1/2 h-52 overflow-hidden flex items-end justify-between">
        <div className="relative w-32 h-32 self-end">
          <Image
            src="/images/cleaner-cropped.svg"
            alt="Cleaner"
            fill
            className="object-contain"
          />
        </div>

        <div className="z-10 text-right">
          <p className="text-lg font-semibold text-[#0D0D0D] leading-snug">
            Urgent 2k? <br />
            Join our line of trusted <br />
            service providers
          </p>
        </div>
      </div>
    </div>
  );
}
