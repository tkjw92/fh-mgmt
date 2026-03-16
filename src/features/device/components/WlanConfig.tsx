import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatePresence } from "framer-motion";
import { Save, WifiCog } from "lucide-react";
import TableRow from "@/components/TableRow";
import SelectField from "@/components/SelectField";
import { Switch } from "@/components/ui/switch";
import TextField from "@/components/TextField";
import { Button } from "@/components/ui/button";
import { useWlanConfig } from "@/stores/WlanConfig";
import { useParams } from "react-router";
import useFetchDevice from "../hooks/useFetchDevice";
import { useEffect } from "react";
import useRefreshLan from "../hooks/useRefreshLan";
import { useSetWlan } from "../hooks/useSetWlan";
import { Spinner } from "@/components/ui/spinner";

export default function WlanConfig() {
    const { device_id } = useParams()

    const store = useWlanConfig()

    const setWlan = useSetWlan({
        device_id: device_id ?? "",
        index: store.index,
        ssid: store.ssid,
        password: store.password,
        enabled: store.enable,
        wpaSec: store.wpaSec,
        channelAuto: store.channelAuto,
        channel: store.channel
    })

    useRefreshLan(device_id)
    const { data, isLoading } = useFetchDevice(device_id)

    useEffect(() => {
        if (data) {
            const devices = data[0]
            store.setPossibleIndex(Array.from({ length: devices.InternetGatewayDevice.LANDevice?.[1]?.LANWLANConfigurationNumberOfEntries?._value ?? 0 }, (_, i) => i + 1))

            store.setEnable(devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].Enable?._value ?? false)
            store.setSsid(devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].SSID._value ?? "")
            store.setPassword(devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].PreSharedKey[1].PreSharedKey._value ?? "")

            store.setWpaSec(
                devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].WPAAuthenticationMode._value === "PSKAuthentication"
                    ? "wpa2"
                    : "open"
            )

            const possibleChannel = devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].PossibleChannels._value
            if (possibleChannel?.includes('-')) {
                store.setPossibleChannel(Array.from({ length: parseInt(possibleChannel.split('-')[1]) }, (_, i) => i + 1))
            } else if (possibleChannel?.includes(',')) {
                store.setPossibleChannel(possibleChannel.split(',').map(channel => parseInt(channel)))
            }

            store.setChannel(devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].ChannelsInUse._value ?? 1)
            store.setChannelAuto(devices.InternetGatewayDevice.LANDevice?.[1]?.WLANConfiguration[store.index].AutoChannelEnable._value ?? false)
        }
    }, [data, store.index])

    if (isLoading) {

    } else {
        return (
            <Card className="w-full max-w-2xl shadow-lg">
                <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                        <div className="p-2 rounded-lg bg-primary/10">
                            <WifiCog className="h-5 w-5 text-primary" />
                        </div>
                        WLAN Configuration
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Table */}
                    <div className="rounded-lg border overflow-hidden">
                        <table className="w-full text-sm">
                            <tbody>
                                <AnimatePresence mode="sync">
                                    <TableRow key="wlanIndex" label="WLAN Index" motionKey="wlanIndex" delay={0.09}>
                                        <SelectField
                                            onChange={(index) => store.setIndex(parseInt(index))}
                                            value={String(store.index)}
                                            options={store.possibleIndex.map(index => ({
                                                value: String(index),
                                                label: String(index)
                                            }))} />
                                    </TableRow>

                                    <TableRow key="enable" label="Enable SSID" motionKey="enable" delay={0.09}>
                                        <Switch checked={store.enable} onCheckedChange={store.setEnable} />
                                    </TableRow>

                                    <TableRow key="ssid" label="SSID" motionKey="ssid" delay={0.09}>
                                        <TextField
                                            value={store.ssid ?? ""}
                                            onChange={(ssid) => { store.setSsid(ssid) }} />
                                    </TableRow>

                                    <TableRow key="wlanEncryption" label="WLAN Encryption" motionKey="wlanEncryption" delay={0.09}>
                                        <SelectField
                                            placeholder="Choose security"
                                            onChange={(val) => store.setWpaSec(val === "wpa2" ? "wpa2" : "open")}
                                            value={store.wpaSec}
                                            options={[
                                                { value: "open", label: "Open" },
                                                { value: "wpa2", label: "WPA2/PSK" }
                                            ]} />
                                    </TableRow>

                                    {store.wpaSec === "wpa2" && (
                                        <TableRow label="Password" motionKey="password" delay={0.09}>
                                            <TextField
                                                disabled={store.wpaSec !== "wpa2"}
                                                value={store.password ?? ""}
                                                onChange={(password) => { store.setPassword(password) }} />
                                        </TableRow>
                                    )}


                                    <TableRow key="channel-auto" label="Channel Auto" motionKey="channel-auto" delay={0.09}>
                                        <Switch checked={store.channelAuto} onCheckedChange={store.setChannelAuto} />
                                    </TableRow>

                                    {!store.channelAuto && (
                                        <TableRow key="channel" label="Channel" motionKey="channel" delay={0.09}>
                                            <SelectField
                                                disabled={store.channelAuto}
                                                placeholder="Choose Channel"
                                                onChange={(channel) => { store.setChannel(parseInt(channel)) }}
                                                value={String(store.channel)}
                                                options={store.possibleChannel.map((channel) => ({
                                                    value: String(channel),
                                                    label: String(channel)
                                                }))} />
                                        </TableRow>
                                    )}
                                </AnimatePresence>
                            </tbody>
                        </table>
                    </div>

                    <div className="pt-2 flex justify-end">
                        <Button className="gap-2" onClick={() => setWlan.mutate()} disabled={setWlan.isPending} >
                            {setWlan.isPending ? <Spinner /> : <Save className="h-4 w-4" />}
                            Save
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }
}