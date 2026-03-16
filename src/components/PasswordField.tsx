import { useState } from "react"
import { Input } from "./ui/input"
import { Eye, EyeOff } from "lucide-react"

export default function PasswordField({ value, onChange }: {
    value: string
    onChange: (v: string) => void
}) {
    const [show, setShow] = useState(false)
    return (
        <div className="relative w-full">
            <Input
                type={show ? "text" : "password"}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="h-8 text-sm pr-9 bg-background border-input"
                autoComplete="new-password"
            />
            <button
                type="button"
                onClick={() => setShow((s) => !s)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={show ? "Hide password" : "Show password"}
            >
                {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
        </div>
    )
}