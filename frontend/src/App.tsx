import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";

export function App() {
  return (
    <div className="flex justify-center lg:items-center mt-16 lg:mt-0 w-screen h-screen">
      <div className="flex flex-col gap-16 w-full max-w-5xl px-6">
        <Header />
        <SummaryTable />
      </div>
    </div>
  )
}
