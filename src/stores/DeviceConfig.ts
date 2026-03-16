import { formatDuration } from "@/lib/formatDuration";
import { create } from "zustand";

type DeviceConfig = {
  sn: string;
  setSn: (sn: string) => void;
  uptime: string;
  setUptime: (time: number) => void;
  superUser: string;
  setSuperUser: (user: string) => void;
  superPassword: string;
  setSuperPassword: (pass: string) => void;
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (pass: string) => void;
  remote: boolean;
  setRemote: (state: boolean) => void;
};

export const useDeviceConfig = create<DeviceConfig>((set) => ({
  sn: "",
  setSn: (sn) => set({ sn: sn }),
  uptime: "",
  setUptime: (time) => set({ uptime: formatDuration(time) }),
  superUser: "",
  setSuperUser: (user) => set({ superUser: user }),
  superPassword: "",
  setSuperPassword: (pass) => set({ superPassword: pass }),
  user: "",
  setUser: (user) => set({ user: user }),
  password: "",
  setPassword: (pass) => set({ password: pass }),
  remote: false,
  setRemote: (state) => set({ remote: state }),
}));
