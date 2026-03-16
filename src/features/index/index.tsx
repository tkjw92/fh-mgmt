import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/lib/api";
import { formatDuration } from "@/lib/formatDuration";
import type { listDevicesSchema } from "@/lib/schemas";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

function Index() {
    const { data: devices = [] } = useQuery({
        queryKey: ["devicesQuery"],
        queryFn: async () => {
            const query = {
                "_deviceId._Manufacturer": "FiberHome"
            }

            const req = await api.get<listDevicesSchema[]>("/devices/?query=" + encodeURIComponent(JSON.stringify(query)));
            return req.data;
        },
    })

    return (
        <div className="overflow-hidden rounded-md border m-10">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="capitalize">serial number</TableHead>
                        <TableHead className="capitalize">PPPoE username</TableHead>
                        <TableHead className="capitalize">SSID</TableHead>
                        <TableHead className="capitalize">uptime</TableHead>
                        <TableHead className="capitalize">clients</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        devices.map((device) => (
                            <TableRow key={device._id}>
                                <TableCell>
                                    <Link to={"/device/" + device._id} className="underline font-semibold">
                                        {device._deviceId._SerialNumber}
                                    </Link>
                                </TableCell>
                                <TableCell>{device.InternetGatewayDevice.WANDevice[1].WANConnectionDevice?.[2]?.WANPPPConnection?.[1]?.Username?._value}</TableCell>
                                <TableCell>{device.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration?.[1]?.SSID?._value}</TableCell>
                                <TableCell>{formatDuration(Number(device.InternetGatewayDevice.DeviceInfo?.UpTime?._value || 0))}</TableCell>
                                <TableCell>{device.InternetGatewayDevice.LANDevice?.[1]?.Hosts?.HostNumberOfEntries?._value}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default Index
