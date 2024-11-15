import { useCallback, useState } from "react";

interface useBooleanStateReturn {
  bool: boolean;
  setTrue(): void;
  setFalse(): void;
  toggle(): void;
}

export default function useBooleanState(
  defaultValue: boolean = false
): useBooleanStateReturn {
  const [bool, setBool] = useState<boolean>(defaultValue);

  const setTrue = useCallback(() => {
    setBool(true);
  }, []);

  const setFalse = useCallback(() => {
    setBool(false);
  }, []);

  const toggle = useCallback(() => {
    setBool((prev) => !prev);
  }, []);

  return { bool, setTrue, setFalse, toggle } as const;
}
