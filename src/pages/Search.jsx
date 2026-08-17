function Search() {
  return (
    <div className="min-h-screen bg-[#121212] text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Search</h1>

      <input
        type="text"
        placeholder="What do you want to play?"
        className="w-full max-w-lg bg-white text-black px-5 py-3 rounded-full outline-none"
      />
    </div>
  );
}

export default Search;
