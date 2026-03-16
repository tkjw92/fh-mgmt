import WlanConfig from "./components/WlanConfig"
import WanConfig from "./components/WanConfig"
import DeviceConfig from "./components/DeviceConfig"

export default function DeviceInfoTable() {
    return (
        <div className="min-h-screen bg-muted/40 flex flex-col md:flex-row justify-center items-start gap-2 p-4">
            <DeviceConfig />
            <WanConfig />
            <WlanConfig />
        </div>
    )
}