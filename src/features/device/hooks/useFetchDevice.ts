import { api } from "@/lib/api";
import type { listDevicesSchema } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";

export default function useFetchDevice(device_id?: string) {
  return useQuery({
    queryKey: ["devices", device_id],
    queryFn: async () => {
      const req = await api.get<listDevicesSchema[]>(
        "/devices/?query=" + encodeURI(JSON.stringify({ _id: device_id })),
      );

      return req.data;
    },
  });
}
