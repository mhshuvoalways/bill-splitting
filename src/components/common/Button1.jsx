const Button1 = ({ buttonLabel, className, onClick }) => {
  return (
    <button
      className={`border rounded-md px-10 py-1 bg-gray-200 hover:bg-gray-300 w-full transition ${className}`}
      onClick={onClick}
    >
      {buttonLabel}
    </button>
  );
};

export default Button1;
