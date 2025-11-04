"use client";

type AdminTableProps = {
  columns: string[];
  rows: Record<string, any>[]; // each row is an object
};

export default function AdminTable({ columns, rows }: AdminTableProps) {
  return (
    <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          {columns.map((col) => (
            <th key={col} className="px-4 py-2 text-left text-sm font-medium text-gray-700">
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((col) => (
              <td key={col} className="px-4 py-2 text-sm text-gray-800">
                {/* stringify objects to avoid React error */}
                {typeof row[col] === "object" && row[col] !== null
                  ? JSON.stringify(row[col])
                  : row[col]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
