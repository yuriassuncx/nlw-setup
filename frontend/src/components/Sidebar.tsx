import { Timer, XCircle } from 'phosphor-react';

import { useApplication } from '../hooks/useApplication';

export function Sidebar() {    
    const { setActiveMenu, user } = useApplication();

    return (
        <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
            <div className="flex justify-between items-center">
                <div
                    className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight text-slate-900 dark:text-white"
                >
                    <Timer /> <span>Habits</span>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={() => setActiveMenu(false)}
                        className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block dark:text-white hover:bg-slate-100/20"
                    >
                        <XCircle />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-4 mt-10 ml-3">
                <h1 className="text-lg font-bold">Minha conta</h1>

                <div className="flex gap-3 p-2 bg-zinc-900 text-white rounded-md mr-3">
                    <img src={user?.picture} alt="Imagem de perfil do usuário" className="w-16 h-16 rounded-full" />
                    <p>{user?.name}</p>
                </div>
            </div>
        </div>
    )
}