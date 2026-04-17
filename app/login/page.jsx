import Image from "next/image";
import LoginAuthPanel from "./components/LoginAuthPanel";

export default function Page() {
  return (
    <main className="flex flex-1 gap-px mb-[1px]">
      <div className="flex flex-1 flex-col relative">
        <Image src="/para.png" alt="background" fill />
      </div>
      <div className="flex flex-1 flex-col bg-[#28283d]">
        <div className="grid flex-1 place-items-center px-2">
          <div
            className="text-6xl font-light text-white text-center"
            style={{ fontFamily: "RecifeDisplay" }}
          >
            ACE WITH SECONDARIES
          </div>
          <LoginAuthPanel />
          <div></div>
        </div>
      </div>
    </main>
  );
}
