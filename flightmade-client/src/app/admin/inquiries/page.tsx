"use client";

import { useEffect, useState } from "react";
import AdminTable from "@/components/AdminTable";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/admin/inquiries")
      .then((res) => res.json())
      .then(setInquiries);
  }, []);

  return (
     <div className="p-8 text-black min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Inquiries</h1>
      <AdminTable
        columns={["id", "name", "email", "phone", "notes", "createdAt"]}
        rows={inquiries}
      />
    </div>
  );
}
