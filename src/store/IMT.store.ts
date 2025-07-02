import { create } from "zustand"

interface IMTState {
    imt: number | null;
    setIMT: (imt: number | null) => void;
    reset: () => void;
}

const useIMTStore = create<IMTState>((set) => ({
    imt: null,
    setIMT: (imt) => set(() => ({ imt })),
    reset: () => set(() => ({
        height: 0,
        weight: 0,
        imt: null
    })),
}));

export default useIMTStore;