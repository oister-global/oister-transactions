import Image from "next/image";
import LoginAuthPanel from "./components/LoginAuthPanel";

const column = "flex-1 bg-[#28283d]";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-px">
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
      <main className="flex flex-1 gap-px">
        <div className={column}>
          <div className="grid h-full items-center justify-center">
            <div
              className="px-10 text-6xl font-light text-white"
              style={{ fontFamily: "RecifeDisplay" }}
            >
              ACE WITH SECONDARIES
            </div>
          </div>
        </div>
        <div className={column}>
          <div className="grid h-full items-center justify-center">
            <LoginAuthPanel />
          </div>
        </div>
      </main>
    </div>
  );
}
