import React from "react";
import { FormControl, FormField, FormItem } from "./ui/form";
import { Input } from "./ui/input";

type InputSectionProps = {
    name: string;
    placeholder: string
    control: any
}

const InputSection = ({name, placeholder, control}: InputSectionProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <Input
              className="border-none bg-black placeholder:text-[#FFFFFF80] placeholder:font-bold text-white font-semibold text-base md:text-[16px]"
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
};

export default InputSection;
