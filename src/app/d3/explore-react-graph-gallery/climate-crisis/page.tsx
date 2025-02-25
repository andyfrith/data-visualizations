import { Scatterplot } from "./components/scatterplot";
import { data } from "./data";

const dimensions = {
  width: 500,
  height: 500,
  margin: {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50,
  },
};

export default function Page() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Scatterplot dimensions={dimensions} data={data} />
        </div>
      </main>
    </div>
  );
}
