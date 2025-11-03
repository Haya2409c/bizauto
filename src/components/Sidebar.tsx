"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  LayoutDashboard,
  Users,
  FileText,
  Package,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
  { name: "CRM", icon: Users, path: "/crm" },
  { name: "Invoices", icon: FileText, path: "/invoices" },
  { name: "Inventory", icon: Package, path: "/inventory" },
  { name: "WhatsApp", icon: MessageSquare, path: "/whatsapp" },
  { name: "Analytics", icon: BarChart3, path: "/analytics" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const logout = () => router.push("/signin");

  return (
   <div className="flex flex-col h-full w-[220px] bg-card text-foreground border-r">
      {/* Logo */}
      <div className="p-4 flex items-center gap-2 border-b bg-background sticky top-0 z-10">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-primary-foreground" />
        </div>
        <span className="text-lg sm:text-xl font-bold text-primary whitespace-nowrap">
          BizAuto
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto custom-scroll">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Button
              key={item.name}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start gap-2 text-sm sm:text-base transition-all duration-200 ${
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "hover:bg-muted"
              }`}
              onClick={() => router.push(item.path)}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {item.name}
            </Button>
          );
        })}
      </nav>

      {/* Bottom Profile + Logout */}
      <div className="p-4 border-t bg-background space-y-3">
        <div className="bg-muted rounded-lg p-3">
          <div className="flex items-center gap-3 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm font-medium leading-tight">Muniba</p>
              <p className="text-xs text-muted-foreground truncate">
                muniba@gmail.com
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs capitalize">
            admin
          </Badge>
        </div>

        <Button
          variant="ghost"
          className="w-full justify-start gap-2 text-red-600 hover:bg-red-50 transition-colors"
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  );
}
