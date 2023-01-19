import { useState } from "react";
import { Check } from "phosphor-react";

export function NewHabitForm() {
    const [habit, setHabit] = useState("");

    return (
        <form className="flex flex-col w-full mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual seu comprometimento?
            </label>

            <input
                type="text"
                id="title"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="ex.: Exercícios, dormir bem, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400"
                autoFocus
            />

            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>

            <button
                type="submit"
                className="flex items-center justify-center mt-6 rounded-lg p-4 gap-3 font-semibold bg-green-600 hover:bg-green-500 disabled:opacity-75 disabled:cursor-not-allowed"
                disabled={habit.length < 3}
            >
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}
