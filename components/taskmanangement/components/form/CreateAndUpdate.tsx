"use client";

import React, { useState } from "react";
import {
  X,
  Calendar,
  User,
  Flag,
  FileText,
  Clock,
  Save,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// Types
interface TaskFormData {
  id?: number;
  title: string;
  description: string;
  start_date: string;
  due_date: string;
  priority: "low" | "medium" | "high";
  status: "todo" | "in_progress" | "done" | "cancelled";
  assignee_id: number;
  project_id?: number;
}

interface CreateAndUpdateProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "create" | "update";
  initialData?: TaskFormData;
}

const CreateAndUpdate: React.FC<CreateAndUpdateProps> = ({
  isOpen,
  onClose,
  mode,
  initialData,
}) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: initialData?.title || "",
    description: initialData?.description || "",
    start_date: initialData?.start_date?.split("T")[0] || "",
    due_date: initialData?.due_date?.split("T")[0] || "",
    priority: initialData?.priority || "medium",
    status: initialData?.status || "todo",
    assignee_id: initialData?.assignee_id || 1,
    project_id: initialData?.project_id || undefined,
    ...initialData,
  });

  console.log(formData);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock data
  const users = [
    { id: 1, name: "John Doe", avatar: "JD" },
    { id: 2, name: "Jane Smith", avatar: "JS" },
    { id: 3, name: "Mike Johnson", avatar: "MJ" },
    { id: 4, name: "Sarah Wilson", avatar: "SW" },
  ];

  const projects = [
    { id: 101, name: "Website Redesign", color: "bg-blue-500" },
    { id: 102, name: "Mobile App", color: "bg-green-500" },
    { id: 103, name: "Marketing Campaign", color: "bg-purple-500" },
    { id: 104, name: "API Development", color: "bg-orange-500" },
  ];

  const handleInputChange = (
    field: keyof TaskFormData,
    value: string | number
  ) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-700 border-green-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-100 text-green-700 border-green-200";
      case "in_progress":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "todo":
        return "bg-gray-100 text-gray-700 border-gray-200";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                {mode === "create" ? (
                  <Plus className="h-4 w-4 text-white" />
                ) : (
                  <FileText className="h-4 w-4 text-white" />
                )}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  {mode === "create" ? "Create New Task" : "Update Task"}
                </h2>
                <p className="text-sm text-gray-500">
                  {mode === "create"
                    ? "Add a new task to your project"
                    : `Edit task #${formData.id}`}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Task Title *
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter task title..."
                className={`w-full ${
                  errors.title ? "border-red-300 focus:ring-red-500" : ""
                }`}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="Enter task description..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Start Date *
                </label>
                <Input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) =>
                    handleInputChange("start_date", e.target.value)
                  }
                  className={`w-full ${
                    errors.start_date ? "border-red-300 focus:ring-red-500" : ""
                  }`}
                />
                {errors.start_date && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.start_date}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Clock className="inline h-4 w-4 mr-1" />
                  Due Date *
                </label>
                <Input
                  type="date"
                  value={formData.due_date}
                  onChange={(e) =>
                    handleInputChange("due_date", e.target.value)
                  }
                  className={`w-full ${
                    errors.due_date ? "border-red-300 focus:ring-red-500" : ""
                  }`}
                />
                {errors.due_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                )}
              </div>
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Flag className="inline h-4 w-4 mr-1" />
                  Priority
                </label>
                <div className="space-y-2">
                  {["low", "medium", "high"].map((priority) => (
                    <label
                      key={priority}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={priority}
                        checked={formData.priority === priority}
                        onChange={(e) =>
                          handleInputChange("priority", e.target.value)
                        }
                        className="text-blue-600 focus:ring-blue-500"
                      />
                      <Badge className={`${getPriorityColor(priority)} border`}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </Badge>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <div className="space-y-2">
                  {["todo", "in_progress", "done", "cancelled"].map(
                    (status) => (
                      <label
                        key={status}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="status"
                          value={status}
                          checked={formData.status === status}
                          onChange={(e) =>
                            handleInputChange("status", e.target.value)
                          }
                          className="text-blue-600 focus:ring-blue-500"
                        />
                        <Badge className={`${getStatusColor(status)} border`}>
                          {status.replace("_", " ").charAt(0).toUpperCase() +
                            status.replace("_", " ").slice(1)}
                        </Badge>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Assignee */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="inline h-4 w-4 mr-1" />
                Assignee
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {users.map((user) => (
                  <label
                    key={user.id}
                    className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors ${
                      formData.assignee_id === user.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="assignee"
                      value={user.id}
                      checked={formData.assignee_id === user.id}
                      onChange={(e) =>
                        handleInputChange(
                          "assignee_id",
                          parseInt(e.target.value)
                        )
                      }
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs bg-gray-100">
                        {user.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-gray-900">
                      {user.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Project */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project (Optional)
              </label>
              <div className="space-y-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="project"
                    value=""
                    checked={!formData.project_id}
                    onChange={() => handleInputChange("project_id", "")}
                    className="text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-600">No Project</span>
                </label>
                {projects.map((project) => (
                  <label
                    key={project.id}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="project"
                      value={project.id}
                      checked={formData.project_id === project.id}
                      onChange={(e) =>
                        handleInputChange(
                          "project_id",
                          parseInt(e.target.value)
                        )
                      }
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className={`h-3 w-3 rounded-full ${project.color}`} />
                    <span className="text-sm font-medium text-gray-900">
                      {project.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>{mode === "create" ? "Create Task" : "Update Task"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAndUpdate;
