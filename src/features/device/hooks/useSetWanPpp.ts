import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import useFetchDevice from "./useFetchDevice";

type setWanPPPInterface = {
  device_id?: string;
  username: string;
  password: string;
  vlanEnabled: boolean;
  vlanId: number;
  lanBinding: string[];
};

export default function useSetWanPpp({
  device_id,
  username,
  password,
  vlanEnabled,
  vlanId,
  lanBinding,
}: setWanPPPInterface) {
  const oldQuery = useFetchDevice(device_id);

  return useMutation({
    mutationFn: async () => {
      const payload = {
        name: "setParameterValues",
        parameterValues: [
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.Enable",
            true,
            "xsd:boolean",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.ConnectionType",
            "PPPoE_Routed",
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.X_FH_ServiceList",
            "INTERNET",
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.Username",
            username,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.Password",
            password,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.VLANEnable",
            vlanEnabled,
            "xsd:string",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.VLANID",
            vlanId,
            "xsd:unsignedInt",
          ],
          [
            "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection.1.X_FH_LanInterface",
            lanBinding.join(","),
            "xsd:string",
          ],
        ],
      };

      await api.post(
        "/devices/" + device_id + "/tasks?connection_request",
        payload,
      );
    },
    onSettled: () => oldQuery.refetch(),
    onSuccess: () => toast.success("Data perangkat berhasil disimpan!"),
  });
}
