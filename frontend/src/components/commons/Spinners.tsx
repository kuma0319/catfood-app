const Spinners = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ backdropFilter: "blur(3px)", zIndex: 9999 }}
      role="status"
      aria-label="loading"
    >
      <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-current border-t-transparent text-gray-400"></div>
    </div>
  );
};

export default Spinners;
