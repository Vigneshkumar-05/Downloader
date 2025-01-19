type ProgressPropsType = {
  progress: number;
};

function ProgressBar({ progress }: ProgressPropsType): JSX.Element {
  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full">
        <div
          className="h-[1.5px] bg-emerald-500 rounded-xl transition-[width] ease-in"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
