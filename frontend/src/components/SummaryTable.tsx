import { weekDays } from "../utils/data";
import { HabitDay } from "./HabitDay";

import { generateDatesFromYearBeggining } from "../utils/generate-dates-from-year-beginning";

const summaryDates = generateDatesFromYearBeggining();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

export function SummaryTable() {
    return (
        <div className="flex flex-col lg:flex-row w-full pb-8 lg:pb-0">
            <div className="grid grid-cols-7 lg:grid-rows-7 lg:grid-cols-1 grid-flow-row gap-3">
                {weekDays.map((weekDay, i) => (
                    <div key={`${weekDay}-${i}`} className="flex items-center justify-center text-white dark:text-zinc-400 font-bold text-xl h-10 w-10">
                        {weekDay}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 lg:grid-cols-1 lg:grid-rows-7 lg:grid-flow-col gap-3">
                {summaryDates.map(date => {
                    return <HabitDay key={date.toString()} />
                })}

                {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
                    return (
                        <div
                            key={i}
                            className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
                        />
                    )
                })}
            </div>
        </div>
    )
}
