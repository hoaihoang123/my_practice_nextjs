"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Users,
  FolderOpen,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const mainNavItems = [
    {
      href: "/taskmanagement",
      icon: LayoutDashboard,
      label: "Dashboard",
      count: null,
    },
    {
      href: "/taskmanagement/tasks",
      icon: CheckSquare,
      label: "My Tasks",
      count: 12,
    },
    {
      href: "/taskmanagement/calendar",
      icon: Calendar,
      label: "Calendar",
      count: null,
    },
    {
      href: "/taskmanagement/projects",
      icon: FolderOpen,
      label: "Projects",
      count: 5,
    },
    {
      href: "/taskmanagement/team",
      icon: Users,
      label: "Team",
      count: null,
    },
    {
      href: "/taskmanagement/reports",
      icon: BarChart3,
      label: "Reports",
      count: null,
    },
  ];

  return (
    <aside
      className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? "w-16" : "w-64"
      } flex flex-col h-screen`}
    >
      {/* Toggle Button */}
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 pb-4">
        {/* Create Task Button */}
        {!isCollapsed && (
          <div className="mb-6">
            <Button className="w-full flex items-center justify-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Create Task</span>
            </Button>
          </div>
        )}

        {/* Main Navigation */}
        <nav className="space-y-1 mb-8">
          {!isCollapsed && (
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Main
            </h3>
          )}
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                } ${isCollapsed ? "justify-center" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <Icon className="h-5 w-5 flex-shrink-0" />
                {!isCollapsed && (
                  <>
                    <span className="ml-3 flex-1">{item.label}</span>
                    {item.count && (
                      <Badge
                        variant="secondary"
                        className="ml-auto text-xs bg-gray-100"
                      >
                        {item.count}
                      </Badge>
                    )}
                  </>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
