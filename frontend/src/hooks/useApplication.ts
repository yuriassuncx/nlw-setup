import { useContext } from "react";
import { AppContext } from "../contexts/AppContext";

export function useApplication() {
    const context = useContext(AppContext);

    return context;
}