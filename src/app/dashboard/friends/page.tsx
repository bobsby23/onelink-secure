
import { users, loggedInUser } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserMinus } from "lucide-react";

export default function FriendsPage() {
    const friends = users.filter(user => loggedInUser.friends.includes(user.id));

    return (
        <div className="container mx-auto">
            <div className="space-y-2 mb-8">
                <h1 className="text-3xl font-bold font-headline">Your Friends</h1>
                <p className="text-muted-foreground">Manage your secure connections.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Friend List</CardTitle>
                    <CardDescription>
                        You have {friends.length} {friends.length === 1 ? 'friend' : 'friends'}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {friends.length > 0 ? (
                        <div className="space-y-4">
                            {friends.map(friend => (
                                <div key={friend.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                                    <div className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarImage src={friend.avatarUrl} alt={friend.profile.name} />
                                            <AvatarFallback>{friend.profile.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-semibold">{friend.profile.name}</p>
                                            <p className="text-sm text-muted-foreground font-mono">@{friend.nickname}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon">
                                        <UserMinus className="h-4 w-4" />
                                        <span className="sr-only">Remove Friend</span>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-center py-8">You haven't added any friends yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
