import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export function useReboot(device_id: string) {
  return useMutation({
    mutationFn: async () => {
      await api.post("/devices/" + device_id + "/tasks?connection_request", {
        name: "reboot",
      });
    },
    onSuccess: () => toast.success("Perangkat berhasil di reboot!"),
  });
}
