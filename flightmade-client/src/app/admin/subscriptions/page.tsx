"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function SubscriptionsPage() {
  const [subscriptions, setSubscriptions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/subscriptions")
      .then((res) => res.json())
      .then(setSubscriptions);
  }, []);

  return (
    <div className="p-8 text-black">
      <h1 className="text-2xl font-bold mb-6">Subscriptions</h1>
      <AdminTable
        columns={["id", "email", "createdAt"]}
        rows={subscriptions}
      />
    </div>
  );
}
