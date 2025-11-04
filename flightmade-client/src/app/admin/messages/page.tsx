"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function MessagesPage() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/messages")
      .then((res) => res.json())
      .then(setMessages);
  }, []);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <AdminTable
        columns={["id", "name", "email", "message", "createdAt"]}
        rows={messages}
      />
    </div>
  );
}

