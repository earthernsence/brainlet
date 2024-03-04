import Image from "next/image";

// TODO: Placeholder images need replacing

export const Logo = () => (
  <div className="hidden md:flex items-center gap-x-2">
    <Image
      src="/no_image.png"
      height={40}
      width={40}
      alt="Logo"
    />
    <p className="font-semibold text-center">
      Epic Notes
    </p>
  </div>
);