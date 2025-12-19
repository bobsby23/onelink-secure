
import { User } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lock, Users, Globe, ArrowUpRight, Edit, Share2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import QrCodeDialog from "../shared/qr-code-dialog";

type BentoGridProps = {
  user: User;
  relationship: 'owner' | 'friend' | 'public';
};

const visibilityIcons = {
  public: <Globe className="h-3 w-3" />,
  'friends-only': <Users className="h-3 w-3" />,
  private: <Lock className="h-3 w-3" />,
};

export function BentoGrid({ user, relationship }: BentoGridProps) {
  const filteredBlocks = user.profile.blocks.filter(block => {
    if (relationship === 'owner') return true;
    if (relationship === 'friend') return block.visibility === 'public' || block.visibility === 'friends-only';
    return block.visibility === 'public';
  });

  return (
    <div className="grid grid-cols-4 auto-rows-[100px] gap-4">
      {filteredBlocks.map(block => {
        const isLocked = relationship !== 'owner' && block.visibility !== 'public';
        const isPrivate = block.visibility === 'private';
        const isFriendsOnly = block.visibility === 'friends-only';
        
        let content;
        switch (block.type) {
          case 'profileHeader':
            content = (
              <div className="relative w-full h-full overflow-hidden group">
                <Image
                  src={block.content.imageUrl}
                  alt={user.profile.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  data-ai-hint={block.content.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                    <div className="flex items-end gap-4">
                         <AvatarImage user={user} />
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold font-headline">{block.content.name}</h1>
                            <p className="text-sm md:text-base text-white/80 max-w-prose">{block.content.bio}</p>
                        </div>
                    </div>
                </div>
                 {relationship === 'owner' && (
                    <div className="absolute top-4 right-4 flex gap-2">
                        <Button size="sm" variant="secondary">
                            <Edit className="mr-2 h-4 w-4"/> Edit
                        </Button>
                        <QrCodeDialog profileUrl={`/u/${user.nickname}`} />
                    </div>
                 )}
              </div>
            );
            break;
            
          case 'link':
            content = (
              <a href={block.content.url} target="_blank" rel="noopener noreferrer" className="block w-full h-full group">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between text-base">
                    <span>{block.content.title}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </CardTitle>
                </CardHeader>
                {relationship === 'owner' && (
                  <CardContent>
                    <Badge variant="outline" className="flex items-center gap-1.5">
                      {visibilityIcons[block.visibility]}
                      <span className="capitalize">{block.visibility.replace('-', ' ')}</span>
                    </Badge>
                  </CardContent>
                )}
              </a>
            );
            break;

          case 'text':
             content = (
                <div className="p-4 h-full">
                    <h3 className="font-bold mb-2">{block.content.title}</h3>
                    <p className="text-sm text-muted-foreground">{block.content.text}</p>
                </div>
             );
             break;
          
          default:
            content = (
              <CardHeader>
                <CardTitle>{block.type}</CardTitle>
                <CardDescription>Block type not implemented</CardDescription>
              </CardHeader>
            );
        }

        return (
          <Card
            key={block.id}
            className="glass-card flex flex-col justify-between hover:border-primary/50"
            style={{
              gridColumn: `span ${block.colSpan}`,
              gridRow: `span ${block.rowSpan}`,
            }}
          >
            {isLocked && !isPrivate ? 
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                <Users className="w-8 h-8 text-muted-foreground mb-2"/>
                <h3 className="font-semibold">Friends-Only</h3>
                <p className="text-sm text-muted-foreground">This content is visible only to friends.</p>
            </div> :
            content}
          </Card>
        );
      })}
    </div>
  );
}


function AvatarImage({ user }: { user: User }) {
    return (
         <div className="relative shrink-0">
            <Image
                src={user.profile.blocks[0].content.avatarUrl}
                alt={user.profile.name}
                width={80}
                height={80}
                className="rounded-full border-4 border-background/20 object-cover shadow-lg"
                data-ai-hint="person portrait"
            />
        </div>
    )
}
