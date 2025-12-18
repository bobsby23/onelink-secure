import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loggedInUser } from "@/lib/data";
import { ArrowUpRight, Link as LinkIcon, Users } from "lucide-react";
import Link from 'next/link';

export default function DashboardPage() {
    const user = loggedInUser;
    
    return (
        <div className="container mx-auto">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-headline">Welcome back, {user.profile.name.split(' ')[0]}!</h1>
                <p className="text-muted-foreground">Here&apos;s a quick overview of your secure profile.</p>
            </div>

             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Links</CardTitle>
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.profile.blocks.filter(b => b.type === 'link').length}</div>
                        <p className="text-xs text-muted-foreground">Across all visibility levels</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Friends</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{user.friends.length}</div>
                        <p className="text-xs text-muted-foreground">Secure connections</p>
                    </CardContent>
                </Card>
                 <Card className="lg:col-span-1">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Your Public Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <Link href={`/u/${user.nickname}`} className="text-sm font-mono truncate hover:underline">{`/u/${user.nickname}`}</Link>
                            <Button variant="ghost" size="icon" asChild>
                                <Link href={`/u/${user.nickname}`} target="_blank">
                                    <ArrowUpRight className="h-4 w-4" />
                                </Link>
                            </Button>
                        </div>
                        
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Get started with managing your profile.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                     <Button asChild>
                        <Link href="/dashboard/links">Manage Links</Link>
                    </Button>
                    <Button asChild variant="secondary">
                        <Link href="/dashboard/friends">View Friends</Link>
                    </Button>
                     <Button asChild variant="secondary">
                        <Link href="/dashboard/settings">Edit Profile</Link>
                    </Button>
                </CardContent>
            </Card>

        </div>
    )
}
