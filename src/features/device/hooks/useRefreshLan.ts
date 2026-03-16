import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useRefreshLan(device_id?: string) {
  return useQuery({
    queryKey: ["devices_lan", device_id],
    queryFn: async () => {
      await Promise.all([
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.Enable",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.SSID",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.PreSharedKey.1.PreSharedKey",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.BeaconType",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.WPAAuthenticationMode",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.PossibleChannels",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.Channel",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.AutoChannelEnable",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.WLANConfiguration.*.ChannelsInUse",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceNumberOfEntries",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.LANDevice.1.LANWLANConfigurationNumberOfEntries",
        }),
      ]);

      return true;
    },
  });
}
