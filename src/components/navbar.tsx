
export default function TopBar() {
  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow-sm">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="bg-[#1A2D7A] text-white px-4 py-2 rounded-md font-bold text-lg relative">
          Snapwork
          <span className="absolute -top-1 right-1 text-[#c4dcff]">✨</span>
        </div>
        
        {/* Location Input */}
        <div className="flex items-center text-gray-500 space-x-2">
          {/* <FaCompass className="text-[#1A2D7A]" /> */}
          <span>Put in your location.....</span>
        </div>
      </div>

      {/* Search Box */}
      <div className="flex items-center space-x-2">
        <div className="flex items-center border rounded px-3 py-2 text-gray-500">
          {/* <FaSearch className="mr-2" /> */}
          <input
            type="text"
            placeholder="Search for your next service......"
            className="outline-none bg-transparent text-sm w-64"
          />
        </div>

        {/* Icons */}
        <button className="bg-[#1A2D7A] text-white p-2 rounded-full">
          {/* <FaList /> */}
        </button>
        <button className="bg-[#1A2D7A] text-white p-2 rounded-full">
          {/* <FaUsers /> */}
        </button>
      </div>
    </div>
  );
}
