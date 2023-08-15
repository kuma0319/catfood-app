interface ButtonProps {
  name: string;
  handleClick?: (event: any) => void;
}

const Button = ({ name, handleClick }: ButtonProps) => {
  return (
    <button
      type="button"
      className="inline-flex items-center justify-center gap-2 rounded-md border-2 border-gray-200 px-4 py-[.688rem] text-sm font-semibold text-blue-500 transition-all hover:border-blue-500 hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2  "
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
