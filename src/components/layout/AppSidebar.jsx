import * as React from 'react';
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Box,
  Boxes,
  Combine,
  Command,
  Frame,
  GalleryVerticalEnd,
  Group,
  Home,
  Info,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
  StoreIcon,
  User,
  Users,
} from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { TeamSwitcher } from './TeamSwitcher';
import { NavMain } from './NavMain';
import { NavProjects } from './NavProjects';
import { NavUser } from './NavUser';
import { useSelector } from 'react-redux';

// This is sample data.
const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: Command,
      plan: 'Free',
    },
  ],
  navMain: [
    // {
    //   title: 'Home',
    //   url: '/',
    //   icon: Home,
    //   isActive: true,
    // },
    {
      title: 'POS',
      url: '/pos',
      icon: StoreIcon,
      isActive: true,
    },
    // {
    //   title: 'About',
    //   url: '/about',
    //   icon: Info,
    // },
    {
      title: 'Product',
      url: '/productPage',
      icon: Box,
    },
    {
      title: 'Category',
      url: '/category',
      icon: Combine,
    },
    {
      title: 'Brand',
      url: '/brand',
      icon: Boxes,
    },
    {
      title: 'Supplier',
      url: '/supplier',
      icon: Users,
    },
    // {
    //   title: 'User',
    //   url: '/user',
    //   icon: User,
    // },
  ],
  projects: [
    {
      name: 'Design Engineering',
      url: '#',
      icon: Frame,
    },
    {
      name: 'Sales & Marketing',
      url: '#',
      icon: PieChart,
    },
    {
      name: 'Travel',
      url: '#',
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const loggedInUser = useSelector((state) => state.user);
  const user = {
    name: loggedInUser?.name || loggedInUser?.username || 'User',
    email: loggedInUser?.email || '',
    avatar: loggedInUser?.avatar || '',
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
