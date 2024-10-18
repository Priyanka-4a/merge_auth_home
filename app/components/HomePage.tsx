// "use client";

// import { useState, useEffect } from "react";
// import { useSession, signIn, signOut } from "next-auth/react";
// import Modal from "react-modal";

// // Modal styles (optional
// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)',
//   },
// };

// export default function HomePageContent() {
//   const { data: session, status } = useSession();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [candidateName, setCandidateName] = useState("");

//   // Open the modal
//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

//   // Handle creating a new candidate
//   const handleCreateCandidate = async () => {
//     try {
//       const response = await fetch("/api/candidates", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ name: candidateName }),
//       });

//       if (response.ok) {
//         alert("Candidate created successfully!");
//         setCandidateName("");
//         closeModal();
//       } else {
//         alert("Failed to create candidate.");
//       }
//     } catch (error) {
//       console.error("Error creating candidate:", error);
//       alert("Error creating candidate.");
//     }
//   };

//   useEffect(() => {
//     if (status === "unauthenticated") {
//       signIn();
//     }
//   }, [status]);

//   if (status === "loading") {
//     return <p>Loading...</p>;
//   }

//   if (status === "unauthenticated") {
//     return null;
//   }

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 flex flex-col justify-between">
//         <div>
//           <h1 className="text-2xl font-bold mb-6">ATS</h1>
//           <ul>
//             <li className="mb-4">
//               <a href="/candidates" className="text-lg text-gray-700 hover:text-black">
//                 Candidates
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/jobs" className="text-lg text-gray-700 hover:text-black">
//                 Jobs
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/reports" className="text-lg text-gray-700 hover:text-black">
//                 Reports
//               </a>
//             </li>
//             <li className="mb-4">
//               <a href="/settings" className="text-lg text-gray-700 hover:text-black">
//                 Settings
//               </a>
//             </li>
//           </ul>
//         </div>

//         {/* User Information and Logout */}
//         <div className="mt-auto">
//           <p>{session?.user?.name}</p>
//           <button
//             onClick={() => signOut()}
//             className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <div className="flex-1 p-8">
//         {/* Header with "New Candidate" button */}
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold">Recent History</h1>
//           <button
//             className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
//             onClick={openModal}
//           >
//             New Candidate
//           </button>
//         </div>

//         {/* Modal for creating a new candidate */}
//         <Modal
//           isOpen={isModalOpen}
//           onRequestClose={closeModal}
//           style={customStyles}
//         >
//           <h2>Create a new candidate</h2>
//           <input
//             type="text"
//             placeholder="Candidate Name"
//             value={candidateName}
//             onChange={(e) => setCandidateName(e.target.value)}
//             className="border p-2 w-full mb-4"
//           />
//           <button
//             onClick={handleCreateCandidate}
//             className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
//           >
//             Create Candidate
//           </button>
//           <button
//             onClick={closeModal}
//             className="ml-4 py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400"
//           >
//             Cancel
//           </button>
//         </Modal>

//         {/* Example Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Date</th>
//                 <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Action</th>
//                 <th className="py-2 px-4 bg-gray-200 text-left text-gray-700">Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="border px-4 py-2">2024-10-17</td>
//                 <td className="border px-4 py-2">Candidate Created</td>
//                 <td className="border px-4 py-2">John Doe</td>
//               </tr>
//               <tr>
//                 <td className="border px-4 py-2">2024-10-16</td>
//                 <td className="border px-4 py-2">Job Posted</td>
//                 <td className="border px-4 py-2">Software Engineer</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function HomePageContent() {
  const { data: session, status } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [candidateName, setCandidateName] = useState("");

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle creating a new candidate
  const handleCreateCandidate = async () => {
    try {
      const response = await fetch("/api/candidates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: candidateName }),
      });

      if (response.ok) {
        alert("Candidate created successfully!");
        setCandidateName("");
        closeModal();
      } else {
        alert("Failed to create candidate.");
      }
    } catch (error) {
      console.error("Error creating candidate:", error);
    }
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      signIn();
    }
  }, [status]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "unauthenticated") return null;

  return (
    <div className="flex h-screen">
      <aside className="w-1/4 bg-gray-100 p-4 border-r border-gray-300 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6">ATS</h1>
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
          <p>{session?.user?.name}</p>
          <button onClick={() => signOut()} className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6 mt-8">
          <h1 className="text-3xl font-bold">Recent History</h1>
          <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800" onClick={openModal}>
            New Candidate
          </button>
        </div>

        {/* Modal for creating a new candidate */}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
          <div>
            <h2>Create a new candidate</h2>
            <input
              type="text"
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="border p-2 w-full mb-4"
            />
            <button onClick={handleCreateCandidate} className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
              Create Candidate
            </button>
            <button onClick={closeModal} className="ml-4 py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    </div>
  );
}
