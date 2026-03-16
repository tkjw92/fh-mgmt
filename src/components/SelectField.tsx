import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

export default function SelectField({ value, options, onChange, placeholder, disabled = false }: {
    value: string
    options: { label: string, value: string }[]
    onChange: (v: string) => void
    placeholder?: string
    disabled?: boolean
}) {
    return (
        <Select onValueChange={onChange} value={value}>
            <SelectTrigger className="h-8 text-sm bg-background border-input" disabled={disabled}>
                <SelectValue placeholder={placeholder ?? "Choose WLAN Index"} />
            </SelectTrigger>
            <SelectContent>
                {
                    options.map(option => (
                        <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))
                }
            </SelectContent>
        </Select>
    )
}