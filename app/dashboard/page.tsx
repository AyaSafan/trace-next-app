"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {session.user?.name}!</h1>
      <p>Your email: {session.user?.email}</p>
      {/* Your dashboard content */}
    </div>
  );
}