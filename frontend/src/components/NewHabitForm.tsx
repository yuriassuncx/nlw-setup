import { FormEvent, useState } from "react";
import { useApplication } from "../hooks/useApplication";

import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from "phosphor-react";

import { availableWeekDays } from "../utils/data";

import { api } from "../lib/axios";

import toast, { Toaster } from "react-hot-toast";

export function NewHabitForm() {
    const { user } = useApplication();
    const [habit, setHabit] = useState("");
    const [weekDays, setWeekDays] = useState<number[]>([]);

    async function createNewHabit(event: FormEvent) {
        event.preventDefault();

        if (!habit || weekDays.length === 0) return;

        await api.post('habits', {
            title: habit,
            weekDays,
        });

        setHabit("");
        setWeekDays([]);

        toast.success('Hábito criado!', {
            position: 'bottom-center',
        });
    }

    function handleToggleWeekDay(weekDay: number) {
        if (!user) return;

        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay);

            setWeekDays(weekDaysWithRemovedOne);
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay];

            setWeekDays(weekDaysWithAddedOne);
        }
    }

    return (
        <form onSubmit={createNewHabit} className="flex flex-col w-full mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input
                type="text"
                id="title"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 group-focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
            />

            <label className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <div className="flex flex-col gap-2 mt-3">
                {availableWeekDays.map((weekDay, index) => (
                    <Checkbox.Root
                        key={weekDay}
                        className="flex items-center gap-3 group focus:outline-none"
                        checked={weekDays.includes(index)}
                        onCheckedChange={() => handleToggleWeekDay(index)}
                    >
                        <div className="flex justify-center items-center h-8 w-8 rounded-lg bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-500 transition-colors group-focus:ring-2 group-focus:ring-violet-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                            <Checkbox.Indicator>
                                <Check size={20} className="text-white" />
                            </Checkbox.Indicator>
                        </div>

                        <span className="text-white leading-tight">
                            {weekDay}
                        </span>
                    </Checkbox.Root>
                ))}
            </div>

            <button
                type="submit"
                className="flex items-center justify-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-75 disabled:cursor-not-allowed transition-colors group-focus:ring-2 group-focus:ring-green-600 group-focus:ring-offset-2 group-focus:ring-offset-zinc-900"
                disabled={habit.length < 3 || weekDays.length === 0}
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>

            <Toaster />
        </form>
    )
}
