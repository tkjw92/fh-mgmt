import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useRefreshWan(device_id?: string) {
  return useQuery({
    queryKey: ["devices_wan", device_id],
    queryFn: async () => {
      await Promise.all([
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.ConnectionStatus",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.Username",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.Password",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.VLANEnable",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.VLANID",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.X_FH_LanInterface",
        }),
      ]);

      return true;
    },
  });
}
