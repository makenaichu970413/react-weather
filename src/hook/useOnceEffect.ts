//? Module
import { useEffect, useRef } from "react";

//? Run the things one time only when dependencies has change
export const useOnceEffect = (callback: () => void, dependencies: any[]) => {
  const isFirst = useRef<boolean>(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      callback();
    }
  }, [...dependencies]);
};

export default useOnceEffect;
