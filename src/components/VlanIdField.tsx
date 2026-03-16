import { Input } from "./ui/input"

export default function VlanIdField({ value, onChange }: {
    value: string
    onChange: (v: string) => void
}) {
    return (
        <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 text-sm bg-background border-input"
            min={1}
            max={4094}
            placeholder="1-4094"
        />
    )
}