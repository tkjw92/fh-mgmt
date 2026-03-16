import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function useInitWan(device_id?: string) {
  const query_client = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/devices/" + device_id + "/tasks?connection_request", {
        name: "addObject",
        objectName: "InternetGatewayDevice.WANDevice.1.WANConnectionDevice",
      });

      await api.post("/devices/" + device_id + "/tasks?connection_request", {
        name: "addObject",
        objectName:
          "InternetGatewayDevice.WANDevice.1.WANConnectionDevice.2.WANPPPConnection",
      });
    },
    onSettled: () => query_client.invalidateQueries({ queryKey: ["devices"] }),
    onSuccess: () => toast.success("WAN connection berhasil diinisialisasi!"),
  });
}
