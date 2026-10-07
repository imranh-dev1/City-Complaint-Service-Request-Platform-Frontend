import { Spinner } from "@/components/ui/spinner";

export default function AuthLoading() {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-3 text-center">
            <Spinner className="size-10 text-primary" />
            <p className="text-sm font-medium text-muted-foreground">
                Verifying your account...
            </p>
        </div>
    );
}