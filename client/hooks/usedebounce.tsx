import React, { useEffect } from "react";

const useDebounce = ({
  search,
  delay = 500,
}: {
  search: string;
  delay?: number;
}) => {
  const [debouncedValue, setDebouncedValue] = React.useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [search, delay]);

  return debouncedValue;
};

export default useDebounce;
