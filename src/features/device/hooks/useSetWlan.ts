import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import useFetchDevice from "./useFetchDevice";
import { toast } from "sonner";

type setWlanInterface = {
  device_id: string;
  index: number;
  enabled: boolean;
  ssid: string;
  password: string;
  wpaSec: "open" | "wpa2";
  channelAuto: boolean;
  channel: number;
};

export function useSetWlan({
  device_id,
  index,
  enabled,
  ssid,
  password,
  wpaSec,
  channelAuto,
  channel,
}: setWlanInterface) {
  const oldQuery = useFetchDevice(device_id);

  return useMutation({
    mutationFn: async () => {
      const payload = {
        name: "setParameterValues",
        parameterValues: [
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.Enable`,
            enabled,
            "xsd:boolean",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.SSID`,
            ssid,
            "xsd:string",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.PreSharedKey.1.PreSharedKey`,
            password,
            "xsd:string",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.AutoChannelEnable`,
            channelAuto,
            "xsd:boolean",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.Channel`,
            channel,
            "xsd:number",
          ],
        ],
      };

      if (wpaSec === "wpa2") {
        payload.parameterValues.push(
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.BeaconType`,
            "11i",
            "xsd:string",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.WPAAuthenticationMode`,
            "PSKAuthentication",
            "xsd:string",
          ],
        );
      } else {
        payload.parameterValues.push(
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.BeaconType`,
            "Basic",
            "xsd:string",
          ],
          [
            `InternetGatewayDevice.LANDevice.1.WLANConfiguration.${index}.WPAAuthenticationMode`,
            "NONE",
            "xsd:string",
          ],
        );
      }

      await api.post(
        "/devices/" + device_id + "/tasks?connection_request",
        payload,
      );
    },
    onSettled: () => oldQuery.refetch(),
    onSuccess: () => toast.success("Data perangkat berhasil disimpan!"),
  });
}
