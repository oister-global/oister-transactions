import Image from "next/image";
import PrimaryButton from "./components/PrimaryButton";

const column = "flex-1 bg-[#28283d]";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-px">
      <header className="flex h-20 gap-px">
        <div className={column}>
          <div className="flex px-10 items-center h-full">
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
          <div className="grid justify-center items-center h-full">
            <div
              className="text-6xl text-white font-light px-10"
              style={{ fontFamily: "RecifeDisplay" }}
            >
              ACE WITH SECONDARIES
            </div>
          </div>
        </div>
        <div className={column}>
          <div className="grid justify-center items-center h-full">
            <div className="flex flex-col gap-4 w-[300px]">
              <input
                type="text"
                id="email"
                placeholder="Enter your Email Address"
                className="text-black placeholder:text-gray-400 bg-white px-4 py-3 border border-white rounded-lg"
                required
              />
              <PrimaryButton text="Continue" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
