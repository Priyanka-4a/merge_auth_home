"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function HomePageContent() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn(); // Redirect users who are not authenticated to the sign-in page
    }
  }, [status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return null; // Hide content until the user is authenticated
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 flex flex-col justify-between">
        <div>
          {/* ATS Header */}
          <h1 className="text-2xl font-bold mb-6">ATS</h1>
          
          {/* Sub-headers */}
          <ul>
            <li className="mb-4">
              <a href="/candidates" className="text-lg text-gray-700 hover:text-black">
                Candidates
              </a>
            </li>
            <li className="mb-4">
              <a href="/jobs" className="text-lg text-gray-700 hover:text-black">
                Jobs
              </a>
            </li>
            <li className="mb-4">
              <a href="/reports" className="text-lg text-gray-700 hover:text-black">
                Reports
              </a>
            </li>
            <li className="mb-4">
              <a href="/settings" className="text-lg text-gray-700 hover:text-black">
                Settings
              </a>
            </li>
          </ul>
        </div>

        {/* User Information and Logout */}
        <div className="mt-auto">
          <div className="flex items-center mb-4">
            <img
              src="/path/to/user-avatar.jpg"
              alt="User Avatar"
              className="w-8 h-8 rounded-full mr-2"
            />
            <p>{session?.user?.name}</p>
          </div>
          <button
            onClick={() => signOut()}
            className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header with "New Candidate" button */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Recent History</h1>
          <a href="/new-candidate">
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              New Candidate
            </button>
          </a>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Date</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Action</th>
                <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Details</th>
              </tr>
            </thead>
            <tbody>
              {/* Example rows */}
              <tr>
                <td className="border px-4 py-2">2024-10-17</td>
                <td className="border px-4 py-2">Candidate Created</td>
                <td className="border px-4 py-2">John Doe</td>
              </tr>
              <tr>
                <td className="border px-4 py-2">2024-10-16</td>
                <td className="border px-4 py-2">Job Posted</td>
                <td className="border px-4 py-2">Software Engineer</td>
              </tr>
              {/* Add more rows as necessary */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}