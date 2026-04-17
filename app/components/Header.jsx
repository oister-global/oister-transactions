import { OisterLogoWhiteIcon, OisterLogoWhiteSmallIcon } from "@/public/svg";

export default function Header() {
  return (
    <header className="flex h-20 gap-px bg-white pb-[1px]">
      <div className="flex-1 bg-[#28283d]">
        <div className="flex h-full items-center px-10">
          <OisterLogoWhiteSmallIcon />
        </div>
      </div>
      <div className="flex-1 bg-[#28283d] flex items-center justify-end">
        <div className="px-10">
          <OisterLogoWhiteIcon />
        </div>
      </div>
    </header>
  );
}
