import TaskFilter from "@/components/taskmanangement/components/TaskFilter";
import TaskList from "@/components/taskmanangement/components/TaskList";
import React from "react";

const page = () => {
  return (
    <div className="space-y-6">
      <TaskFilter />
      <TaskList />
    </div>
  );
};

export default page;
