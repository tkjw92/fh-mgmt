import PasswordField from "@/components/PasswordField";
import ReadOnlyField from "@/components/ReadOnlyField";
import TableRow from "@/components/TableRow";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Switch } from "@/components/ui/switch";
import { motion, AnimatePresence } from "framer-motion";
import { Power, RotateCcw, Save, Server } from "lucide-react";
import useFetchDevice from "../hooks/useFetchDevice";
import { useParams } from "react-router";
import { useEffect } from "react";
import useRefreshDevice from "../hooks/useRefreshDevice";
import { useDeviceConfig } from "@/stores/DeviceConfig";
import { useSetDevice } from "../hooks/useSetDevice";
import { useReboot } from "../hooks/useReboot";
import { useFactoryReset } from "../hooks/useFactoryReset";

export default function DeviceConfig() {
    const { device_id } = useParams()
    useRefreshDevice(device_id)

    const store = useDeviceConfig()

    const { data, isLoading } = useFetchDevice(device_id)
    const setDevice = useSetDevice({
        device_id: device_id ?? "",
        user: store.user,
        password: store.password,
        superUser: store.superUser,
        superPassword: store.superPassword,
        remote: store.remote
    })
    const reboot = useReboot(device_id ?? "")
    const reset = useFactoryReset(device_id ?? "")

    useEffect(() => {
        if (data) {
            const devices = data[0]

            store.setSn(devices._deviceId._SerialNumber)
            store.setUptime(devices.InternetGatewayDevice.DeviceInfo?.UpTime?._value ?? 0)
            store.setSuperUser(devices.InternetGatewayDevice.DeviceInfo?.X_FH_Account?.X_FH_WebUserInfo.WebSuperUsername._value ?? "")
            store.setSuperPassword(devices.InternetGatewayDevice.DeviceInfo?.X_FH_Account?.X_FH_WebUserInfo.WebSuperPassword._value ?? "")
            store.setUser(devices.InternetGatewayDevice.DeviceInfo?.X_FH_Account?.X_FH_WebUserInfo.WebUsername._value ?? "")
            store.setPassword(devices.InternetGatewayDevice.DeviceInfo?.X_FH_Account?.X_FH_WebUserInfo.WebPassword._value ?? "")
            store.setRemote(!!devices.InternetGatewayDevice.X_FH_ACL?.Rule[1])
        }
    }, [data])

    return (
        <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 rounded-lg bg-primary/10">
                        <Server className="h-5 w-5 text-primary" />
                    </div>
                    Device Info
                </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
                <div className="space-x-2">
                    <Button size="xs" className="bg-destructive" disabled={reset.isPending} onClick={() => reset.mutate()}>
                        {
                            reset.isPending
                                ? <Spinner />
                                : <RotateCcw />
                        }
                        Factory Reset
                    </Button>
                    <Button size="xs" className="bg-blue-500" onClick={() => reboot.mutate()} disabled={reboot.isPending}>
                        {
                            reboot.isPending
                                ? <Spinner />
                                : <Power />
                        }
                        Reboot
                    </Button>
                </div>

                <AnimatePresence mode="wait">
                    {isLoading && (
                        <motion.div
                            key="wan-disconnected"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex items-center justify-between bg-destructive/10 text-destructive rounded-lg px-4 py-2 text-sm"
                        >
                            <span className="flex items-center gap-2"><Spinner /> Loading...</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Table */}
                {!isLoading &&
                    (
                        <div className="rounded-lg border overflow-hidden">
                            <table className="w-full text-sm">
                                <tbody>
                                    <AnimatePresence mode="sync">
                                        <TableRow key="serialNumber" label="Serial Number" motionKey="serialNumber" delay={0}>
                                            <ReadOnlyField value={store.sn} />
                                        </TableRow>

                                        <TableRow key="uptime" label="Uptime Perangkat" motionKey="uptime" delay={0.03}>
                                            <ReadOnlyField value={store.uptime} />
                                        </TableRow>

                                        <TableRow key="super-user" label="Super User" motionKey="super-user" delay={0.06}>
                                            <TextField value={store.superUser} onChange={store.setSuperUser} />
                                        </TableRow>

                                        <TableRow key="super-password" label="Super Password" motionKey="super-password" delay={0.09}>
                                            <PasswordField value={store.superPassword} onChange={store.setSuperPassword} />
                                        </TableRow>

                                        <TableRow key="user" label="User" motionKey="user" delay={0.09}>
                                            <TextField value={store.user} onChange={store.setUser} />
                                        </TableRow>

                                        <TableRow key="password" label="Password" motionKey="password" delay={0.09}>
                                            <PasswordField value={store.password} onChange={store.setPassword} />
                                        </TableRow>

                                        <TableRow key="remote" label="Enable WAN Remote" motionKey="remote" delay={0.09}>
                                            <Switch checked={store.remote} onCheckedChange={store.setRemote} />
                                        </TableRow>
                                    </AnimatePresence>
                                </tbody>
                            </table>
                        </div>
                    )
                }

                {!isLoading && (
                    <div className="pt-2 flex justify-end">
                        <Button className="gap-2" disabled={setDevice.isPending} onClick={() => setDevice.mutate()} >
                            {setDevice.isPending ? <Spinner /> : <Save className="h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                )}

            </CardContent>
        </Card>
    )
}