import PrimaryButton from "./components/PrimaryButton";

const column = "flex-1 bg-[#28283d]";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col gap-px">
      <header className="flex h-20 gap-px">
        <div className={column} />
        <div className={column} />
      </header>
      <main className="flex flex-1 gap-px">
        <div className={column} />
        <div className={column}>
          <div className="grid justify-center items-center h-full">
            <div className="flex flex-col gap-4">
              <input
                type="text"
                id="first_name"
                placeholder="Enter your Email ID"
                className="w-[300px] col-span-1 text-white bg-[#28283d] px-4 py-3 border border-white rounded-lg"
                required
              />
              <PrimaryButton text="Sign In" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
