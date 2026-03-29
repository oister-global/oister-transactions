import Image from "next/image";

export default function Header() {
  return (
    <header className="flex h-20 gap-px bg-white">
      <div className="flex-1 bg-[#28283d]">
        <div className="flex h-full items-center px-10">
          <Image
            src="https://unlistedintel.com/wp-content/themes/unlistedintel/assets/images/unlisted-logo-white.svg"
            alt="unlistedIntelLogo"
            width={405}
            height={38}
          />
        </div>
      </div>
      <div className="flex-1 bg-[#28283d]" />
    </header>
  );
}
