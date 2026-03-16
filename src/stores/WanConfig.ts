import { formatDuration } from "@/lib/formatDuration";
import { create } from "zustand";

type WanConfig = {
  detected: boolean;
  setDetected: (state: boolean) => void;
  sn: string;
  setSn: (sn: string) => void;
  uptime: string;
  setUptime: (time: number) => void;
  status: boolean;
  setStatus: (state: boolean) => void;
  username: string;
  setUsername: (username: string) => void;
  password: string;
  setPassword: (pass: string) => void;
  vlanEnabled: boolean;
  setVlanEnabled: (state: boolean) => void;
  vlanId: number;
  setVlanId: (vid: number) => void;
  lanBinding: string[];
  setLanBinding: (ifaces: string[]) => void;
  lanSize: number;
  setLanSize: (num: number) => void;
  wlanSize: number;
  setWlanSize: (num: number) => void;
};

export const useWanConfig = create<WanConfig>((set) => ({
  detected: false,
  setDetected: (state) => set({ detected: state }),
  sn: "",
  setSn: (sn) => set({ sn: sn }),
  uptime: "",
  setUptime: (time) => set({ uptime: formatDuration(time) }),
  status: false,
  setStatus: (state) => set({ status: state }),
  username: "",
  setUsername: (username) => set({ username: username }),
  password: "",
  setPassword: (pass) => set({ password: pass }),
  vlanEnabled: false,
  setVlanEnabled: (state) => set({ vlanEnabled: state }),
  vlanId: 0,
  setVlanId: (vid) => set({ vlanId: vid }),
  lanBinding: [],
  setLanBinding: (ifaces) => set({ lanBinding: ifaces }),
  lanSize: 0,
  setLanSize: (num) => set({ lanSize: num }),
  wlanSize: 0,
  setWlanSize: (num) => set({ wlanSize: num }),
}));
