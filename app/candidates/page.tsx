"use client";
import { useState, useEffect } from "react";
import Modal from "react-modal";

// Define the Candidate interface
interface Candidate {
  id: number;
  name: string;
  createdAt: string;
}

// Modal styles (optional)
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

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Use the Candidate type
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCandidates = async () => {
    const res = await fetch("/api/candidates");
    const data = await res.json();
    setCandidates(data);
  };

  useEffect(() => {
    fetchCandidates(); // Fetch candidates when the component mounts
  }, []);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/4 bg-white p-4 shadow-md">
        <h2 className="text-2xl font-bold mb-6">Candidates</h2>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="grid grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <div
              key={candidate.id}
              className="border p-4 rounded-lg hover:shadow-lg cursor-pointer"
              onClick={() => {
                setSelectedCandidate(candidate);
                openModal();
              }}
            >
              <h3 className="text-lg font-bold">{candidate.name}</h3>
              <p className="text-sm text-gray-600">
                Created on: {new Date(candidate.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Modal for file upload */}
        <Modal isOpen={isModalOpen} onRequestClose={closeModal} style={customStyles}>
          {selectedCandidate && (
            <div>
              <h2>Upload a file for {selectedCandidate.name}</h2>
              <input type="file" className="border p-2 w-full mb-4" />
              <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                Upload
              </button>
              <button onClick={closeModal} className="ml-4 py-2 px-4 bg-gray-300 rounded-lg hover:bg-gray-400">
                Cancel
              </button>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
