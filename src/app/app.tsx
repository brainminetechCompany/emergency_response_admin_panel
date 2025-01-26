"use client";
import { AppSidebar } from "@/components/app_sidebar";
import CircularLoader from "@/components/circle_loader";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { auth } from "@/config/firebase_config";
import Login from "@/pages/login/login";
// import { userModelContext } from "@/hooks/use-userModel";
import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
// import Login from "../pages/login/page";

export default function App({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isFirebaseLoaded, setIsFirebaseLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname() ?? "";
  //   const { setUserModel } = useContext(userModelContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsFirebaseLoaded(true);
      setIsAuthenticated(!!user);
      //   if (user) {
      //     // await
      //     console.log(`User changed ${user.email}`);
      //     setUserModel({
      //       userModel: undefined,
      //       mpModel: undefined,
      //       userRole: undefined,
      //     });
      //   } else {
      //     setUserModel(undefined);
      //   }
    });

    return () => unsubscribe();
  }, []);

  async function loadUserProvider() {
    console.log("============= USER LOADING PROVIDER INITIALIZED ============");
  }

  const breadcrumbItems = pathname
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");

      return (
        <React.Fragment key={href}>
          <BreadcrumbItem>
            {index < array.length - 1 ? (
              <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{segment}</BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {index < array.length - 1 && (
            <BreadcrumbSeparator className="hidden md:block" />
          )}
        </React.Fragment>
      );
    });

  return (
    <SidebarProvider>
      {isAuthenticated && <AppSidebar />}
      <SidebarInset>
        <header className="flex justify-between items-center border-b px-4">
          <div className="flex h-16 shrink-0 items-center gap-2">
            {isAuthenticated && <SidebarTrigger className="-ml-1" />}
            {isAuthenticated && (
              <Separator orientation="vertical" className="mr-2 h-4" />
            )}
            <Breadcrumb>
              <BreadcrumbList>
                {!breadcrumbItems.length
                  ? isAuthenticated
                    ? "Dashboard"
                    : "Login"
                  : breadcrumbItems}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center">
            <span>Powered by</span>
            {/* <Image
              src={"/images/logo.png"}
              width={100}
              height={16}
              alt="wellm_logo"
            /> */}
          </div>
        </header>
        {!isFirebaseLoaded ? (
          <div className="min-h-screen w-full flex items-center justify-center">
            <CircularLoader />
          </div>
        ) : isAuthenticated ? (
          <div className="m-10">{children}</div>
        ) : (
          <Login />
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
