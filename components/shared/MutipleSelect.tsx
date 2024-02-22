import { twMerge } from "tailwind-merge";
import Select, { GroupBase, Props, StylesConfig } from "react-select";

function MutipleSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>, data: any) {
  // const colorStyles: StylesConfig<any, true> = {
  //   multiValueLabel: (styles) => {
  //     return {
  //       ...styles,
  //       backgroundColor: data.color,
  //     };
  //   },
  // };
  return (
    <Select
      unstyled
      {...props}
      classNames={{
        clearIndicator: () => "hover:bg-neutral-500 p-2 rounded-sm",
        control: ({ isDisabled, isFocused }) =>
          twMerge(
            "w-full rounded-md border border-transparent p-3 bg-neutral-700",
            isDisabled ? "opacity-75 " : "",
            isFocused ? "border-blue-400" : "border-transparent"
          ),
        dropdownIndicator: () => "hover:bg-neutral-500 p-2 rounded-sm",
        // group: () => "py-2",
        // groupHeading: () =>
        //   "text-neutral-100 text-lg font-bold p-2 bg-neutral-500",
        // input
        indicatorSeparator: () =>
          "bg-neutral-500 hover:bg-neutral-200 h-6 my-auto",
        loadingIndicator: () => "p-2 hover:bg-neutral-500 rounded-sm",
        // menu, menuList
        multiValue: () => "bg-neutral-500 rounded-md m-1",
        multiValueLabel: () => "rounded-sm p-1",
        multiValueRemove: () => "hover:bg-red-400 rounded-sm p-1",
        noOptionsMessage: () => "text-neutral-100 bg-neutral-500 p-2",
        option: ({ isFocused, isSelected }) =>
          twMerge(
            "text-neutral-100 p-2 cursor-pointer bg-neutral-500 hover:bg-neutral-200 hover:text-neutral-800",
            isFocused && "bg-neutral-600"
          ),
        // placeholder, singleValue, valueContainer
      }}
      // styles={colorStyles}
    />
  );
}
export default MutipleSelect;
