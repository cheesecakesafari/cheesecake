const ComingSoon = () => {
  return (
    <div className="min-h-screen bg-green-600 flex flex-col items-center justify-center">
      {/* Spinner */}
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent mb-6"></div>
      
      {/* Coming Soon Text */}
      <h1 className="text-white text-4xl font-bold">Coming Soon</h1>
    </div>
  );
};

export default ComingSoon;