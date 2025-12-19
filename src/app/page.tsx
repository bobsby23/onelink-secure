
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Lock, Share2, ShieldCheck, Link as LinkIcon, Bot, QrCode } from "lucide-react";
import AppHeader from "@/components/layout/app-header";

const features = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    title: "End-to-End Encryption",
    description: "Your data is secured with client-side encryption, ensuring only you and your connections can see it.",
  },
  {
    icon: <LinkIcon className="w-8 h-8 text-primary" />,
    title: "Bento Grid Profile",
    description: "Organize your links, files, and products in a beautiful, modular bento-style grid.",
  },
  {
    icon: <Bot className="w-8 h-8 text-primary" />,
    title: "Chatbud AI Agent",
    description: "An AI assistant that answers visitor questions based on your public profile information.",
  },
  {
    icon: <QrCode className="w-8 h-8 text-primary" />,
    title: "Easy Sharing",
    description: "Share your profile instantly with a custom URL or a generated QR code.",
  },
];

export default function Home() {
  return (
    <div className="flex-1 w-full">
      <AppHeader />
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-purple-500/10 [mask-image:linear-gradient(to_bottom,white_20%,transparent_100%)]"></div>
          <div className="container px-4 md:px-6 text-center relative">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-br from-foreground to-muted-foreground">
                OneLink Secure
              </h1>
              <p className="mt-4 text-muted-foreground md:text-xl">
                The ultimate link-in-bio, reimagined for privacy. Create, manage, and share your digital identity with end-to-end encryption.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-bold">
                  <Link href="/signup">
                    Get Started Free
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="secondary" className="font-bold">
                  <Link href="/u/demo">
                    View Demo Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-4xl md:text-5xl">A New Standard for Digital Identity</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  OneLink Secure isn't just another link aggregator. It's a private, secure hub for your entire online presence, built with a privacy-first mindset.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-4 mt-12">
              {features.map((feature, index) => (
                <Card key={index} className="glass-card hover:border-primary/50 hover:shadow-primary/10">
                  <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                    {feature.icon}
                    <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-20 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                Ready to Secure Your Digital World?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create your private, shareable profile in minutes. Take control of your data today.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
               <Button asChild size="lg" className="w-full font-bold">
                  <Link href="/signup">
                    Claim Your Secure Profile
                    <ArrowRight className="ml-2" />
                  </Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
