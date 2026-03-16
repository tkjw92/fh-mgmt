import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchDevice from "./useFetchDevice";

type SetDeviceInterface = {
  device_id: string;
  user: string;
  password: string;
  superUser: string;
  superPassword: string;
  remote: boolean;
};

export function useSetDevice({
  device_id,
  user,
  password,
  superUser,
  superPassword,
  remote,
}: SetDeviceInterface) {
  const oldQuery = useFetchDevice(device_id);

  return useMutation({
    mutationFn: async () => {
      const payload = {
        name: "setParameterValues",
        parameterValues: [
          [
            "InternetGatewayDevice.DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebUsername",
            user,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebPassword",
            password,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebSuperUsername",
            superUser,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.DeviceInfo.X_FH_Account.X_FH_WebUserInfo.WebSuperPassword",
            superPassword,
            "xsd:string",
          ],
          ["InternetGatewayDevice.X_FH_ACL.Enable", 1, "xsd:number"],
        ],
      };

      await api.post("/devices/" + device_id + "/tasks?connection_request", {
        name: "deleteObject",
        objectName: "InternetGatewayDevice.X_FH_ACL.Rule.*",
      });

      if (remote) {
        await api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "addObject",
          objectName: "InternetGatewayDevice.X_FH_ACL.Rule",
        });

        await api.post("/devices/" + device_id + "/tasks?connection_request", {
          name: "setParameterValues",
          parameterValues: [
            ["InternetGatewayDevice.X_FH_ACL.Rule.1.Enable", 1, "xsd:number"],
            [
              "InternetGatewayDevice.X_FH_ACL.Rule.1.Direction",
              1,
              "xsd:number",
            ],
            [
              "InternetGatewayDevice.X_FH_ACL.Rule.1.Protocol",
              "ALL",
              "xsd:string",
            ],
          ],
        });
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
