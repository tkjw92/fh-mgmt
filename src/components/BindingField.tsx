import { Checkbox } from "./ui/checkbox"

export default function BindingField(
    { values, count, onChange, group, label, param }:
        { values: string[], count: number, onChange: (v: string[]) => void, group: string, label: string, param: string }
) {
    const toggle = (iface: string) => {
        onChange(
            values.includes(iface) ? values.filter((i) => i !== iface) : [...values, iface]
        )
    }

    return (
        <div>
            <p className="text-xs font-semibold text-muted-foreground mb-1">{group}</p>
            <div className="flex flex-wrap gap-3">
                {[...Array(count)].map((_, i) => (
                    <label key={i} className="flex items-center gap-1.5 text-sm cursor-pointer">
                        <Checkbox
                            checked={values?.includes(`${param}.${i + 1}`)}
                            onCheckedChange={() => toggle(`${param}.${i + 1}`)}
                            className="h-3.5 w-3.5"
                        />
                        {label}-{i + 1}
                    </label>
                ))}
            </div>
        </div>
    )
}