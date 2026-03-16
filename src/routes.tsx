import { Outlet, Route, Routes } from "react-router";
import DeviceLists from "./features/index";
import Device from "./features/device";
import { Toaster } from "sonner";

function MasterLayouts() {
    return (
        <div>
            <Outlet />
            <Toaster />
        </div>
    )
}

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<MasterLayouts />}>
                <Route index element={<DeviceLists />} />
                <Route path="device/:device_id" element={<Device />} />
            </Route>
        </Routes>
    )
}