
import Link from "next/link";
import Logo from "@/components/icons/logo";
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center p-4 bg-grid-pattern bg-center">
       <div className="w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-8">
            <Link href="/" className="mb-4 flex items-center space-x-2">
                <Logo className="h-8 w-8 text-primary" />
                <span className="text-2xl font-bold font-headline">
                OneLink Secure
                </span>
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight font-headline">
                Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
                Enter your credentials to access your secure profile.
            </p>
        </div>
        
        <LoginForm />

        <p className="px-8 text-center text-sm text-muted-foreground mt-6">
            By clicking continue, you agree to our{" "}
            <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
            >
                Terms of Service
            </Link>{" "}
            and{" "}
            <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
            >
                Privacy Policy
            </Link>
            .
        </p>
       </div>
    </main>
  );
}
