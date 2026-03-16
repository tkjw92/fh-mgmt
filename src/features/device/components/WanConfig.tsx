import BindingField from "@/components/BindingField";
import PasswordField from "@/components/PasswordField";
import StatusField from "@/components/StatusField";
import TableRow from "@/components/TableRow";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import VlanIdField from "@/components/VlanIdField";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Server, Wifi, WifiOff } from "lucide-react";
import useFetchDevice from "../hooks/useFetchDevice";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useWanConfig } from "@/stores/WanConfig";
import useInitWan from "../hooks/useInitWan";
import { toast } from "sonner";
import useSetWanPpp from "../hooks/useSetWanPpp";
import useRefreshWan from "../hooks/useRefreshWan";


export default function WanConfig() {
    const { device_id } = useParams()
    useRefreshWan(device_id)

    const store = useWanConfig()

    const initWanMutation = useInitWan(device_id)
    const setWan = useSetWanPpp({
        device_id: device_id,
        username: store.username,
        password: store.password,
        vlanEnabled: store.vlanEnabled,
        vlanId: store.vlanId,
        lanBinding: store.lanBinding,
    })

    const { data, isLoading } = useFetchDevice(device_id)

    const handleSubmit = () => {
        if (store.vlanEnabled) {
            if (!store.vlanId || store.vlanId < 1 || store.vlanId > 4094) {
                toast.error("VLAN ID harus antara 1-4094")
                return
            }
        }

        setWan.mutate()
    }

    useEffect(() => {
        if (data) {
            const devices = data[0]
            const wanConf = devices.InternetGatewayDevice.WANDevice[1].WANConnectionDevice?.[2]?.WANPPPConnection[1]

            store.setDetected(!!devices.InternetGatewayDevice.WANDevice[1].WANConnectionDevice[2])
            store.setStatus(wanConf?.ConnectionStatus?._value === "Connected")
            store.setUsername(wanConf?.Username?._value ?? "")
            store.setPassword(wanConf?.Password?._value ?? "")
            store.setVlanEnabled(!!wanConf?.VLANEnable?._value)
            store.setVlanId(wanConf?.VLANID?._value ?? 0)
            store.setLanBinding(wanConf?.X_FH_LanInterface?._value.split(",") ?? [])
            store.setLanSize(devices.InternetGatewayDevice.LANDevice?.[1]?.LANEthernetInterfaceNumberOfEntries?._value ?? 0)
            store.setWlanSize(devices.InternetGatewayDevice.LANDevice?.[1]?.LANWLANConfigurationNumberOfEntries?._value ?? 0)
        }

        console.log(store);
    }, [data, setWan.isPending])

    return (
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Server className="h-5 w-5 text-primary" />
                    </div>
                    WAN Configuration
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* WAN Banner */}
                <AnimatePresence mode="wait">
                    {!store.detected && (
                        <motion.div
                            key="wan-disconnected"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-sm"
                        >
                            <div className="">
                                {
                                    isLoading
                                        ? <span className="flex items-center gap-2"><Spinner /> Loading...</span>
                                        : <span className="flex items-center gap-2"><WifiOff className="h-4 w-4" />WAN PPP Connection tidak terdeteksi</span>
                                }
                            </div>
                            <Button size="sm" variant="outline" disabled={initWanMutation.isPending || isLoading} onClick={() => initWanMutation.mutate()}>
                                {initWanMutation.isPending ? <Spinner /> : <Wifi className="h-3.5 w-3.5 mr-1" />}
                                Init WAN
                            </Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Table */}
                <div className="rounded-lg border overflow-hidden">
                    <table className="w-full text-sm">
                        <tbody>
                            <AnimatePresence mode="sync">
                                <TableRow key="pppoeStatus" label="PPPoE Status" motionKey="pppoeStatus" delay={0.06}>
                                    <StatusField connected={store.status} />
                                </TableRow>

                                {store.detected && (
                                    <TableRow key="pppoeUsername" label="PPPoE Username" motionKey="pppoeUsername" delay={0.09}>
                                        <TextField value={store.username} onChange={store.setUsername} />
                                    </TableRow>
                                )}

                                {store.detected && (
                                    <TableRow key="pppoePassword" label="PPPoE Password" motionKey="pppoePassword" delay={0.12}>
                                        <PasswordField value={store.password} onChange={store.setPassword} />
                                    </TableRow>
                                )}

                                {store.detected && (
                                    <TableRow key="vlan-enable" label="Enable VLAN" motionKey="vlan-enable" delay={0.15}>
                                        <Switch checked={store.vlanEnabled} onCheckedChange={store.setVlanEnabled} />
                                    </TableRow>
                                )}

                                {store.detected && store.vlanEnabled && (
                                    <TableRow key="vlan-id" label="VLAN ID" motionKey="vlan-id" delay={0.18}>
                                        <VlanIdField value={String(store.vlanId)} onChange={(val) => store.setVlanId(parseInt(val))} />
                                    </TableRow>
                                )}

                                {store.detected && (
                                    <TableRow key="lan-binding" label="LAN Binding" motionKey="lan-binding" delay={0.21}>
                                        <div className="space-y-3">
                                            <BindingField
                                                group="Ethernet"
                                                label="ether"
                                                values={store.lanBinding}
                                                onChange={store.setLanBinding}
                                                count={store.lanSize}
                                                param="InternetGatewayDevice.LANDevice.1.LANEthernetInterfaceConfig" />

                                            <BindingField
                                                group="Wireless"
                                                label="wlan"
                                                values={store.lanBinding}
                                                onChange={store.setLanBinding}
                                                count={store.wlanSize}
                                                param="InternetGatewayDevice.LANDevice.1.WLANConfiguration" />
                                        </div>
                                    </TableRow>
                                )}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                <div className="pt-2 flex justify-end">
                    {store.detected && (
                        <Button onClick={handleSubmit} className="gap-2" disabled={setWan.isPending}>
                            {setWan.isPending ? <Spinner /> : <Save className="h-4 w-4" />}
                            Save
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}