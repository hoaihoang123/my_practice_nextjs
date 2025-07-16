import { api_key, base_url } from "@/constants/constants";
import { Task } from "@/types/types";

import React from "react";
import TaskListClient from "./TaskListClient";

async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${base_url}/workspaces/tasks`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch tasks");
  }
  return response.json();
}

const TaskList = async () => {
  const mockTasks = await fetchTasks();

  return <TaskListClient initialTasks={mockTasks} />;
};

export default TaskList;
