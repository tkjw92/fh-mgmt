import { create } from "zustand";

type WlanConfig = {
  possibleIndex: number[];
  setPossibleIndex: (indexes: number[]) => void;
  index: number;
  setIndex: (index: number) => void;
  enable: boolean;
  setEnable: (state: boolean) => void;
  ssid: string;
  setSsid: (ssid: string) => void;
  password: string;
  setPassword: (password: string) => void;
  channel: number;
  setChannel: (channel: number) => void;
  possibleChannel: number[];
  setPossibleChannel: (channels: number[]) => void;
  wpaSec: "open" | "wpa2";
  setWpaSec: (mode: "open" | "wpa2") => void;
  channelAuto: boolean;
  setChannelAuto: (state: boolean) => void;
};

export const useWlanConfig = create<WlanConfig>((set) => ({
  possibleIndex: [],
  setPossibleIndex: (indexes: number[]) => set({ possibleIndex: indexes }),
  index: 1,
  setIndex: (index: number) => set({ index: index }),
  enable: false,
  setEnable: (state: boolean) => set({ enable: state }),
  ssid: "",
  setSsid: (ssid: string) => set({ ssid: ssid }),
  password: "",
  setPassword: (password: string) => set({ password: password }),
  channel: 0,
  setChannel: (channel: number) => set({ channel: channel }),
  possibleChannel: [],
  setPossibleChannel: (channels: number[]) =>
    set({ possibleChannel: channels }),
  wpaSec: "open",
  setWpaSec: (mode) => set({ wpaSec: mode }),
  channelAuto: false,
  setChannelAuto: (state) => set({ channelAuto: state }),
}));
