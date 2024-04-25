import { useEffect, RefObject } from "react";

type RefType<T> = RefObject<T> | null;

const useOutsideClick = <T extends HTMLElement>(
  ref: RefType<T>,
  callback: () => void
): void => {
  const handleClick = (e: MouseEvent): void => {
    if (ref?.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [ref, callback]);
};

export default useOutsideClick;
