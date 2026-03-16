import { motion } from "framer-motion"

const rowVariants = {
    initial: { opacity: 0, y: -8 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -8 },
}

export default function TableRow({ label, children, motionKey, delay = 0 }: {
    label: string
    children: React.ReactNode
    motionKey: string
    delay?: number
}) {
    return (
        <motion.tr
            key={motionKey}
            variants={rowVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.18, delay }}
            className="border-b last:border-b-0"
        >
            <td className="px-4 py-2.5 font-medium text-muted-foreground w-45 bg-muted/30 align-top">
                {label}
            </td>
            <td className="px-4 py-2">{children}</td>
        </motion.tr>
    )
}