import { createContext, useEffect, useState } from "react";

type User = {
    name: string;
    email: string;
    picture: string;
}

type AuthContextType = {
    user: User | null;
    setUser: any;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<"dark" | "light">>;
    activeMenu: boolean;
    setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

type ChildrenProps = {
    children: React.ReactNode;
}

export const AppContext = createContext({} as AuthContextType);

export function AppProvider({ children }: ChildrenProps) {
    const [theme, setTheme] = useState<'dark' | 'light'>(
        localStorage.getItem("theme") !== "dark" ? "light" : "dark"
    );

    const [user, setUser] = useState<User | null>(null);

    const [activeMenu, setActiveMenu] = useState(true); 

    useEffect(() => {
        const root = window.document.documentElement;

        const oldTheme = theme === 'dark' ? 'light' : 'dark';

        root.classList.remove(oldTheme);
        root.classList.add(theme);
        
        localStorage.setItem("theme", theme);
    }, [theme]);

    return (
        <AppContext.Provider value={{ user, setUser, theme, setTheme, activeMenu, setActiveMenu }}>
            {children}
        </AppContext.Provider>
    )
}

