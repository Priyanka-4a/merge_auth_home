// app/components/CandidatesPage.tsx

export default function CandidatesPage() {
    return (
      <div className="flex h-screen bg-gray-100">
        {/* Sidebar */}
        <div className="w-1/4 bg-white p-4 shadow-md">
          <h2 className="text-2xl font-bold mb-6">Candidates</h2>
        </div>
  
        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Top Candidates</h1>
            <button className="bg-black text-white py-2 px-4 rounded-lg">
              Create New Candidate
            </button>
          </div>
  
          {/* No Candidates Section */}
          <div className="flex flex-col items-center justify-center h-full">
            <img
              src="/path/to/your/illustration.png"
              alt="No Candidates"
              className="mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">No Candidates Yet</h2>
            <p className="text-gray-500">
              You do not have any candidates yet. Create one to get started.
            </p>
          </div>
        </div>
      </div>
    );
  }
  