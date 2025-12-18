
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Copy, RefreshCw, TriangleAlert, Loader2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { useCrypto } from "@/hooks/use-crypto";

const formSchema = z.object({
  nickname: z.string().min(3, { message: "Nickname must be at least 3 characters." }),
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  hasSaved: z.boolean().refine(val => val, { message: "You must confirm you have saved your recovery phrase." }),
});

export default function SignupForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const { generateMnemonic, generateKeyPair, isGenerating } = useCrypto();

  useEffect(() => {
    // Generate mnemonic only when we get to step 2 for the first time
    if (step === 2 && !recoveryPhrase) {
      const mnemonic = generateMnemonic();
      setRecoveryPhrase(mnemonic);
      // We will generate key pair on final submission
    }
  }, [step, recoveryPhrase, generateMnemonic]);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      hasSaved: false,
    },
  });

  function handleNextStep() {
    form.trigger(["nickname", "email", "password"]).then(isValid => {
      if (isValid) {
        setStep(2);
      }
    });
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (step === 2) {
      if (!recoveryPhrase) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Recovery phrase not generated. Please go back and try again."
        });
        return;
      }
      
      const keyPair = await generateKeyPair();
      if (!keyPair) {
          toast({
              variant: "destructive",
              title: "Key Generation Failed",
              description: "Could not generate cryptographic keys. Please try again."
          });
          return;
      }

      console.log("Signup values:", values);
      console.log("Generated Public Key (to be stored):", keyPair.publicKey);
      // In a real app, you'd handle account creation here.
      // 1. Create user with email/password via Firebase Auth.
      // 2. Encrypt the private key with the recovery phrase.
      // 3. Store the encrypted private key, public key, and salt in Firestore.
      toast({
        title: "Account Created!",
        description: "Redirecting to your new dashboard...",
      });
      router.push("/dashboard");
    }
  }

  const copyToClipboard = () => {
    if (!recoveryPhrase) return;
    navigator.clipboard.writeText(recoveryPhrase);
    toast({ title: "Copied to clipboard!" });
  }

  const handleGenerateNewPhrase = () => {
    const mnemonic = generateMnemonic();
    setRecoveryPhrase(mnemonic);
  }

  return (
    <Card className="glass-card overflow-hidden">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: step === 1 ? 0 : 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="font-headline">Create Account</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="nickname"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nickname</FormLabel>
                          <FormControl>
                            <Input placeholder="your-unique-name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="name@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex-col gap-4">
                    <Button type="button" onClick={handleNextStep} className="w-full">
                      Continue
                    </Button>
                     <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Link href="/login" className="text-primary hover:underline">
                            Log In
                        </Link>
                    </p>
                  </CardFooter>
                </>
              )}
              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="font-headline">Secure Your Account</CardTitle>
                    <CardDescription>
                      This is your recovery phrase. It's the only way to recover your account and encrypted data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <Alert variant="destructive">
                        <TriangleAlert className="h-4 w-4" />
                        <AlertTitle>Save this phrase!</AlertTitle>
                        <AlertDescription>
                           Store it somewhere safe and secret. Do not share it with anyone.
                        </AlertDescription>
                    </Alert>
                    <div className="p-4 border-2 border-dashed rounded-lg bg-muted/50 min-h-[100px] flex items-center justify-center">
                        {isGenerating ? (
                            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                        ) : (
                            <p className="text-lg font-mono text-center tracking-wide leading-relaxed">
                                {recoveryPhrase}
                            </p>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <Button type="button" variant="secondary" onClick={copyToClipboard} className="w-full" disabled={isGenerating || !recoveryPhrase}>
                            <Copy className="mr-2 h-4 w-4" /> Copy Phrase
                        </Button>
                        <Button type="button" variant="ghost" size="icon" onClick={handleGenerateNewPhrase} disabled={isGenerating}>
                            <RefreshCw className="h-4 w-4" />
                        </Button>
                    </div>
                    <FormField
                      control={form.control}
                      name="hasSaved"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                                I have saved my recovery phrase in a secure location.
                            </FormLabel>
                             <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                     <Button type="submit" className="w-full" disabled={isGenerating}>
                      {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                      Complete Signup
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setStep(1)} className="w-full">
                      Back
                    </Button>
                  </CardFooter>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </form>
      </Form>
    </Card>
  );
}
