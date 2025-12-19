
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

function QrCodePlaceholder() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full h-full p-2 bg-white rounded-md">
            <path fill="black" d="M0 0h30v30H0zM10 10h10v10H10zM70 0h30v30H70zM80 10h10v10H80zM0 70h30v30H0zM10 80h10v10H10zM40 0h10v10H40zM60 0h10v10H60zM0 40h10v10H0zM0 60h10v10H0zM40 40h30v10H40zM50 50h10v20H50zM70 30h10v20H70zM90 40h10v10H90zM40 70h10v30H40zM60 70h30v10H60zM70 80h10v20H70zM90 60h10v10H90zM40 20h10v10H40zM30 30h10v10H30zM20 60h20v10H20z" />
        </svg>
    )
}

export default function QrCodeDialog({ profileUrl }: { profileUrl: string }) {
    const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${profileUrl}` : profileUrl;
    const { toast } = useToast();

    const copyUrl = () => {
        navigator.clipboard.writeText(fullUrl);
        toast({ title: "Profile URL copied!" });
    }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="secondary">
          <Share2 className="mr-2 h-4 w-4" /> Share
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            Anyone with this link can view your public profile.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center p-4 bg-muted rounded-lg">
            <div className="w-40 h-40">
                <QrCodePlaceholder />
            </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={fullUrl} readOnly />
          </div>
          <Button type="button" size="sm" className="px-3" onClick={copyUrl}>
            <span className="sr-only">Copy</span>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        <DialogFooter className="sm:justify-start"></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
