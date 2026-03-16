import { Input } from "./ui/input"

export default function TextField({ value, onChange, disabled = false }: {
    value: string
    onChange: (v: string) => void,
    disabled?: boolean
}) {
    return (
        <Input
            disabled={disabled}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="h-8 text-sm bg-background border-input"
        />
    )
}