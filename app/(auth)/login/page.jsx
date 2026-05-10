import Image from "next/image";
import LoginAuthPanel from "./components/LoginAuthPanel";

export default function Page() {
  return (
    <main className="mb-px flex flex-1 gap-px h-screen mt-20">
      <div className="flex flex-1 flex-col relative xxs:hidden">
        <Image src="/para.png" alt="background" fill />
      </div>
      <div className="flex flex-1 flex-col bg-[#28283d]">
        <div className="grid flex-1 place-items-center">
          <div
            className="px-4 text-6xl font-light text-white text-center leading-tight xxs:text-4xl xxs:px-0"
            style={{ fontFamily: "RecifeDisplay" }}
          >
            ACE WITH <br />
            SECONDARIES
          </div>
          <LoginAuthPanel />
        </div>
      </div>
    </main>
  );
}
