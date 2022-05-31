import * as Label from "@radix-ui/react-label";
import { GoTriangleUp } from "react-icons/go";

const SelectComponent = ({
  error,
  Controller,
  name,
  control,
  data,
  label,
  placeholder,
  register,
}) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Label.Root
                className={"relative w-full focus:border-primary z-10 "}
                htmlFor="formCreate"
              >
                <span className="absolute -top-3 left-2 bg-white text-14 font-bold pl-1 pr-3 rounded text-secondary">
                  {label}
                </span>
                <select
                  required
                  name={name}
                  {...register(name)}
                  {...field}
                  className={
                    " border-secondary border w-full py-4 px-4 focus:outline-none focus:ring focus:ring-primary focus:mb-1"
                  }
                >
                  <option value="" disabled className="disabled:text-gray-400">
                    {placeholder}
                  </option>
                  {data &&
                    data.map((item, index) => {
                      return (
                        <option
                          key={index}
                          value={item.value}
                          className="text-black"
                        >
                          {item.name}
                        </option>
                      );
                    })}
                </select>
                {error && (
                  <div className="mt-2 z-20 font-roboto text-left w-9/16 ml-1 font-regular text-12 text-white flex relative justify-items-start">
                    <span className="bg-red-600 inline-block z-20 w-auto p-1">
                      {error.message}
                    </span>
                    <GoTriangleUp
                      size={"30px"}
                      className="absolute -top-4 z-5 text-red-600"
                    />
                  </div>
                )}
              </Label.Root>
            </>
          );
        }}
      />
    </>
  );
};

export default SelectComponent;
