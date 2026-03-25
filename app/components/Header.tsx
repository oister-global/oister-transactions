import Image from "next/image";

const column = "flex-1 bg-[#28283d]";

export default function Header() {
  return (
    <header className="flex h-20 gap-px">
      <div className={column}>
        <div className="flex h-full items-center px-10">
          <Image
            src="https://unlistedintel.com/wp-content/themes/unlistedintel/assets/images/unlisted-logo-white.svg"
            alt="unlistedIntelLogo"
            width={405}
            height={38}
          />
        </div>
      </div>
      <div className={column} />
    </header>
  );
}
