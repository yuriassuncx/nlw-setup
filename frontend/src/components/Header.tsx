import { useApplication } from "../hooks/useApplication";

import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";

import * as Dialog from '@radix-ui/react-dialog';
import logoImage from '../assets/logo.svg';

import { MoonStars, SunDim, Plus, X } from "phosphor-react";
import { NewHabitForm } from "./NewHabitForm";

export function Header() {
    const { theme, setTheme, user, setUser } = useApplication();

    const login = useGoogleLogin({
        onSuccess: async credentialResponse => {
            try {
                const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: {
                        "Authorization": `Bearer ${credentialResponse.access_token}`
                    }
                })

                setUser(response.data);
            } catch(err) {
                alert(err);
            }
        }
    });

    return (
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-4xl mx-auto">
            <img src={logoImage} alt="Habits Logo" />

            <Dialog.Root>
                {!user ? (
                    <button className="bg-white text-violet-500 font-semibold text-lg p-2 hover:scale-110 duration-150 ease-in transition rounded-md mt-12 lg:mt-0" onClick={() => login()}>
                        Fazer Login com Google 🚀
                    </button>
                ) : (
                <>
                    <div className="flex lg:hidden gap-3 pt-12 justify-center">
                        <Dialog.Trigger
                            type="button"
                            className="flex lg:hidden items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300"
                        >
                            <Plus size={20} className="text-violet-500" />
                            Novo
                        </Dialog.Trigger>

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

                    <div className="hidden lg:flex items-center gap-4">
                        <Dialog.Trigger
                            type="button"
                            onClick={() => {}}
                            className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
                        >
                            <Plus size={20} className="text-violet-500" />
                            Novo hábito
                        </Dialog.Trigger>

                        {theme === 'light' ? (
                            <button
                                type="button"
                                className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300 focus:outline-none transition-colors focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
                                onClick={() => setTheme('dark')}
                            >
                                <MoonStars size={20} className="text-violet-500" />
                                Dark Mode
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="flex items-center gap-3 border border-violet-500 font-semibold rounded-lg px-6 py-4 hover:border-violet-300 focus:outline-none transition-colors focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-background"
                                onClick={() => setTheme('light')}
                            >
                                <SunDim size={20} className="text-violet-500" />
                                Light Mode
                            </button>
                        )}

                        <Dialog.Portal>
                            <Dialog.Overlay className="w-screen h-screen bg-slate-200/80 dark:bg-black/80 fixed inset-0" />

                            <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                                <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-violet-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                                    <X size={24} aria-label="Fechar" />
                                </Dialog.Close>
                                
                                <Dialog.Title className="text-3xl leading-tight font-extrabold">
                                    Criar hábito
                                </Dialog.Title>

                                <NewHabitForm />
                            </Dialog.Content>
                        </Dialog.Portal>
                    </div>
                </>
                )}  
            </Dialog.Root>
        </div>
    )
}
