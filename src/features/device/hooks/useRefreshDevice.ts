import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export default function useRefreshDevice(device_id?: string) {
  return useQuery({
    queryKey: ["devices_basic", device_id],
    queryFn: async () => {
      await Promise.all([
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName: "InternetGatewayDevice.DeviceInfo.UpTime",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName:
            "InternetGatewayDevice.DeviceInfo.X_FH_Account.X_FH_WebUserInfo",
        }),
        api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "refreshObject",
          objectName: "InternetGatewayDevice.X_FH_ACL",
        }),
      ]);

      return true;
    },
  });
}
