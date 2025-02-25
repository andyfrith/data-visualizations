import { Scatterplot } from "./components/scatterplot";
import { data } from "./data";

const dimensions = {
  width: 400,
  height: 400,
  margin: {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60,
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
