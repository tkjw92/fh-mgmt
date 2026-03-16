import { Badge } from "./ui/badge";

export default function StatusField({ connected }: { connected: boolean }) {
    return connected
        ? <Badge variant="default">Connected</Badge>
        : <Badge variant="outline">Disconnect</Badge>
}