import LoginAuthPanel from "./components/LoginAuthPanel";

export default function Page() {
  return (
    <main className="flex flex-1 gap-px mt-[1px]">
      <div className="flex flex-1 flex-col bg-[#28283d]">
        <div className="grid flex-1 place-items-center px-10">
          <div
            className="px-10 text-6xl font-light text-white"
            style={{ fontFamily: "RecifeDisplay" }}
          >
            ACE WITH SECONDARIES
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col bg-[#28283d]">
        <div className="grid flex-1 place-items-center px-2">
          <LoginAuthPanel />
        </div>
      </div>
    </main>
  );
}
