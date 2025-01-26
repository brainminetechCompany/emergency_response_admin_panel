"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { ChevronDown, LayoutDashboard, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { CollapsibleContent } from "../ui/collapsible";
import { NavUser } from "../user_nav";
// import { SearchForm } from "./sidebar-form";

const staticSidebarData = {
  navMain: [
    {
      title: "Moderate",
      url: "/",
      icon: LayoutDashboard,
      items: [
        {
          title: "Add",
          url: "/moderators",
          icon: Plus,
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const router = useRouter();
  const pathname = usePathname();

  const [sideBarData, setSideBarData] = useState(staticSidebarData);

  const handleClick = (url: string) => {
    router.push(url);
  };

  // function onChange(element:string){
  //     setSideBarData(stat)
  // }

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>{/* <SearchForm /> */}</SidebarHeader>
      <div className="h-0.5 w-full bg-gray-200" />
      <SidebarContent>
        {sideBarData.navMain.map((item) => {
          const isSectionActive =
            pathname === item.url || pathname?.startsWith(item.url + "/");
          return (
            <Collapsible
              key={item.title}
              defaultOpen={isSectionActive}
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel asChild>
                  <CollapsibleTrigger>
                    {
                      <item.icon
                        className={`${isSectionActive ? "text-black" : ""}`}
                      />
                    }
                    <span
                      className={`pl-2 ${
                        isSectionActive ? "font-bold text-black" : ""
                      }`}
                    >
                      {item.title}
                    </span>
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent className="p-2">
                    <SidebarMenu>
                      {item.items.map((subItem) => {
                        const isActive = pathname === subItem.url;
                        return (
                          <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild isActive={isActive}>
                              <a
                                href={subItem.url}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleClick(subItem.url);
                                }}
                              >
                                {<subItem.icon />}
                                {subItem.title}
                              </a>
                            </SidebarMenuButton>
                          </SidebarMenuItem>
                        );
                      })}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          );
        })}
      </SidebarContent>
      {/* <SidebarRail /> */}
      <SidebarFooter>
        <NavUser
          user={{
            name: "Test Admin User",
            avatar: "https://randomuser.me/api/portraits/women/16.jpg",
            email: "test@test.com",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
