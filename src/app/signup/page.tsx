import Link from "next/link";
import Logo from "@/components/icons/logo";
import SignupForm from "@/components/auth/signup-form";

export default function SignupPage() {
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
                Create Your Secure Account
            </h1>
            <p className="text-sm text-muted-foreground">
                Start by entering your details below.
            </p>
        </div>
        
        <SignupForm />

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
