import { useApplication } from "../hooks/useApplication";

import logoImage from '../assets/logo.svg';

import { MoonStars, SunDim, Plus } from "phosphor-react";

export function Header() {
    const { theme, setTheme } = useApplication();

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl mx-auto">
            <img src={logoImage} alt="Habits Logo" />

            <div className="hidden lg:flex items-center gap-4">
                <button
                    type="button"
                    className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                >
                    <Plus size={20} className="text-violet-500" />
                    Novo hábito
                </button>

                {theme === 'light' ? (
                    <button
                        type="button"
                        className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                        onClick={() => setTheme('dark')}
                    >
                        <MoonStars size={20} className="text-violet-500" />
                        Dark Mode
                    </button>
                ) : (
                    <button
                        type="button"
                        className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                        onClick={() => setTheme('light')}
                    >
                        <SunDim size={20} className="text-violet-500" />
                        Light Mode
                    </button>
                )}
            </div>

            <div className="flex gap-3 pt-12 justify-center lg:hidden">
                <button
                    type="button"
                    className="flex lg:hidden items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                >
                    <Plus size={20} className="text-violet-500" />
                    Novo
                </button>

                {theme === 'light' ? (
                    <button
                        type="button"
                        className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                        onClick={() => setTheme('dark')}
                    >
                        <MoonStars size={20} className="text-violet-500" />
                        Dark Mode
                    </button>
                ) : (
                    <button
                        type="button"
                        className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                        onClick={() => setTheme('light')}
                    >
                        <SunDim size={20} className="text-violet-500" />
                        Light Mode
                    </button>
                )}
            </div>
        </div>
    )
}
