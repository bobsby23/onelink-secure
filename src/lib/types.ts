
export type User = {
  id: string;
  nickname: string;
  email: string;
  avatarUrl: string;
  profile: Profile;
  friends: string[]; // array of friend user ids
};

export type Profile = {
  name: string;
  bio: string;
  blocks: BentoBlock[];
};

export type BentoBlock = {
  id: string;
  type: 'link' | 'embed' | 'product' | 'image' | 'text' | 'profileHeader';
  colSpan: number;
  rowSpan: number;
  content: LinkBlockContent | ProfileHeaderBlockContent | any;
  visibility: 'public' | 'private' | 'friends-only';
};

export type LinkBlockContent = {
  title: string;
  url: string;
  icon?: string;
};

export type ProfileHeaderBlockContent = {
  name: string;
  bio: string;
  avatarUrl: string;
  imageUrl: string;
};
