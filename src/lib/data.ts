import type { User } from './types';

export const users: User[] = [
  {
    id: '1',
    nickname: 'demo',
    email: 'demo@onelink.secure',
    avatarUrl: 'https://picsum.photos/seed/103/128/128',
    friends: ['2'],
    profile: {
      name: 'Demo User',
      bio: 'Exploring the future of secure digital identity. This is a demo profile showcasing the capabilities of OneLink Secure.',
      blocks: [
        {
          id: 'block-1',
          type: 'profileHeader',
          colSpan: 4,
          rowSpan: 2,
          visibility: 'public',
          content: {
            name: 'Demo User',
            bio: 'Exploring the future of secure digital identity. This is a demo profile showcasing the capabilities of OneLink Secure.',
            avatarUrl: 'https://picsum.photos/seed/103/128/128',
            imageUrl: 'https://picsum.photos/seed/demo_user/800/400',
            imageHint: "abstract art",
          },
        },
        {
          id: 'block-2',
          type: 'link',
          colSpan: 2,
          rowSpan: 1,
          visibility: 'public',
          content: {
            title: 'My Portfolio',
            url: '#',
          },
        },
        {
          id: 'block-3',
          type: 'link',
          colSpan: 2,
          rowSpan: 1,
          visibility: 'public',
          content: {
            title: 'Follow on Twitter',
            url: '#',
          },
        },
        {
          id: 'block-4',
          type: 'link',
          colSpan: 1,
          rowSpan: 1,
          visibility: 'friends-only',
          content: {
            title: 'Friend-Only Link',
            url: '#',
          },
        },
        {
          id: 'block-5',
          type: 'link',
          colSpan: 1,
          rowSpan: 1,
          visibility: 'private',
          content: {
            title: 'Private Document',
            url: '#',
          },
        },
         {
          id: 'block-6',
          type: 'text',
          colSpan: 2,
          rowSpan: 1,
          visibility: 'public',
          content: {
            title: 'About Me',
            text: 'I am a passionate developer and designer focused on creating beautiful, functional, and secure web experiences.'
          },
        },
      ],
    },
  },
  {
    id: '2',
    nickname: 'friend_of_demo',
    email: 'friend@onelink.secure',
    avatarUrl: 'https://picsum.photos/seed/101/128/128',
    friends: ['1'],
    profile: {
      name: 'A Friend',
      bio: 'I am friends with the demo user!',
      blocks: [],
    },
  },
  {
    id: '3',
    nickname: 'random_visitor',
    email: 'visitor@onelink.secure',
    avatarUrl: 'https://picsum.photos/seed/102/128/128',
    friends: [],
    profile: {
      name: 'Random Visitor',
      bio: 'Just browsing around.',
      blocks: [],
    },
  },
];

export const findUserByNickname = (nickname: string) => {
  return users.find(user => user.nickname === nickname);
};

// For now, we'll just have a "logged in" user. In a real app this would come from a session.
export const loggedInUser: User = users[0]; // Logged in as 'demo'
// export const loggedInUser: User = users[1]; // Logged in as 'friend_of_demo'
// export const loggedInUser: User | null = null; // Logged out
