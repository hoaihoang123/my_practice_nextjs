import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const TaskFilter = () => {
  return (
    <div className="flex justify-between items-center space-x-4 p-4 bg-white shadow rounded-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input placeholder="Search tasks..." className="pl-10 w-[400px]" />
      </div>

      <div className="flex items-center space-x-4">
        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select className="px-3 py-2 border border-gray-300 rounded-md text-sm">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFilter;
