import { LucideX } from "lucide-react";
import { Button } from "./button";

type AlertTypes = {
    key?: number | string;
    variant?: string;
    title?: string;
    description?: React.ReactNode;
    actionButtons?: React.ReactNode;
    icon?: React.ReactNode;
    onClose?: () => void;
    isShow?: boolean;
};
export function Alert({
    key,
    variant = "default",
    title,
    icon,
    description,
    actionButtons,
    onClose,
    isShow,
}: AlertTypes) {
    const variants = {
        warning: {
            bgColor: "bg-yellow-50",
            borderColor: "border-yellow-200",
            textColor: "text-yellow-700",
            descriptionColor: "text-yellow-600"
        },
        success: {
            bgColor: "bg-green-50",
            borderColor: "border-green-200",
            textColor: "text-green-700",
            descriptionColor: "text-green-600"
        },
        info: {
            bgColor: "bg-blue-50",
            borderColor: "border-blue-200",
            textColor: "text-blue-700",
            descriptionColor: "text-blue-600"
        },
        error: {
            bgColor: "bg-red-50",
            borderColor: "border-red-200",
            textColor: "text-red-700",
            descriptionColor: "text-red-600"
        },
        default: {
            bgColor: "bg-gray-100",
            borderColor: "border-gray-200",
            textColor: "text-gray-700",
            descriptionColor: "text-gray-600"
        }
    };

    const variantStyle = variants[variant as keyof typeof variants] || variants.default;

    return (
        <div
            key={key}
            className={`${isShow ? "flex" : "hidden"} flex-col justify-center border ${variantStyle.bgColor} ${variantStyle.borderColor} my-2 p-2 md:my-4 md:p-4 rounded-lg`}
        >
            <header className="flex items-center justify-between">
                <h3 className={`font-medium ${variantStyle.textColor} flex items-center gap-2 capitalize`}>
                    {icon}
                    {title}
                </h3>
                {onClose && (
                    <Button onClick={onClose} variant="outline" className="rounded-full p-3 bg-transparent border-none">
                        <LucideX className={variantStyle.textColor} />
                    </Button>
                )}
            </header>
            <p className={`text-sm ${variantStyle.descriptionColor} ${variant === "default" ? "capitalize" : ""}`}>
                {description}
            </p>
            {actionButtons}
        </div>
    );
}