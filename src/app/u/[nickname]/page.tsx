
import { notFound } from "next/navigation";
import { findUserByNickname, loggedInUser } from "@/lib/data";
import { BentoGrid } from "@/components/profile/bento-grid";
import ChatWidget from "@/components/profile/chat-widget";

export default function ProfilePage({ params }: { params: { nickname: string } }) {
  const user = findUserByNickname(params.nickname);

  if (!user) {
    notFound();
  }

  // Determine viewer's relationship to the profile owner
  let relationship: 'owner' | 'friend' | 'public' = 'public';
  if (loggedInUser?.id === user.id) {
    relationship = 'owner';
  } else if (loggedInUser && user.friends.includes(loggedInUser.id)) {
    relationship = 'friend';
  }
  
  const publicProfileData = JSON.stringify({
    name: user.profile.name,
    bio: user.profile.bio,
    links: user.profile.blocks
      .filter(block => block.visibility === 'public' && block.type === 'link')
      .map(block => ({ title: block.content.title, url: block.content.url }))
  });


  return (
    <div className="min-h-screen w-full bg-grid-pattern bg-center">
      <div className="container mx-auto p-4 md:p-8">
        <BentoGrid user={user} relationship={relationship} />
      </div>
      <ChatWidget publicProfileData={publicProfileData}/>
    </div>
  );
}
