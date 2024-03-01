"use client";

import * as RadixSlider from "@radix-ui/react-slider";

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
}

const ProgressBar: React.FC<SlideProps> = ({ value = 0, onChange }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
      "
      defaultValue={[0]}
      value={[value]}
      onValueChange={handleChange}
      max={1}
      step={0.01}
      aria-label="Progress bar"
    >
      <RadixSlider.Track
        className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[3px]
          group
        "
      >
        <RadixSlider.Range
          className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          "
        />
        <RadixSlider.Thumb
          className=" hidden group-hover:block -translate-y-1
         size-3 bg-white shadow-md rounded-full hover:bg-neutral-300 focus:outline-none focus:shadow-2xl        "
          aria-label="ProgressBar thumb"
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};

export default ProgressBar;
