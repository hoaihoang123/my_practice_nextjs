// Example usage trong component
"use client";

import { useSession } from "next-auth/react";

export default function UserProfile() {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  if (status === "unauthenticated") return <p>Please login</p>;

  if (session) {
    return (
      <div>
        <h1>User Profile</h1>
        <p>ID: {session.user.id}</p>
        <p>Email: {session.user.email}</p>
        <p>Access Token: {session.access_token}</p>
      </div>
    );
  }

  return null;
}
