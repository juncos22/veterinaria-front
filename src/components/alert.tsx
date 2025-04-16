
type AlertProps = {
  extraClasses?: string;
  title: string;
  text: string;
};

export const Alert = ({ text, title, extraClasses }: AlertProps) => {
  return (
    <div
      role="alert"
      className={`rounded-md border p-4 h-auto shadow-sm w-fit mx-auto my-5 ${extraClasses}`}
    >
      <div className="flex items-start gap-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className={`size-10 text-orange-600`}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <div className="flex-1">
          <strong className="font-medium text-black">{title} </strong>
          <p className="mt-0.5 text-sm text-black">{text}</p>
        </div>
      </div>
    </div>
  );
};
