import Image from "next/image";

export const Heroes = () => (
  <div className="flex flex-col items-center justify-center max-w-5xl">
    <div className="flex items-center">
      <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]">
        <Image
          src="/placeholder.png"
          fill
          className="object-contain"
          alt="Placeholder"
        />
      </div>
      <div className="relative h-[400px] w-[400px] hidden md:block">
        <Image
          src="/placeholder.png"
          fill
          className="object-contain"
          alt="Reading"
        />
      </div>
    </div>
  </div>
);