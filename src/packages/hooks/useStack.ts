import { useCallback, useState } from "react";

interface useStackReturn<T> {
  stack: T[];
  push(item: T): void;
  pop(): T | null;
  peek(): T | null;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
}

export default function useStack<T>(
  defaultValues: T[] = []
): useStackReturn<T> {
  const [stack, setStack] = useState<T[]>(defaultValues);

  const push = useCallback((item: T) => {
    setStack((prevStack) => [...prevStack, item]);
  }, []);

  const pop = useCallback(() => {
    if (stack.length > 0) {
      const poppedItem = stack[stack.length - 1];
      setStack((prevStack) => prevStack.slice(0, -1));
      return poppedItem;
    }

    return null;
  }, [stack]);

  const peek = useCallback(() => {
    if (stack.length > 0) {
      return stack[stack.length - 1];
    }

    return null;
  }, [stack]);

  const size = useCallback(() => {
    return stack.length;
  }, [stack]);

  const isEmpty = useCallback(() => {
    return stack.length === 0;
  }, [stack]);

  const clear = useCallback(() => {
    setStack([]);
  }, []);

  return { stack, push, pop, peek, size, isEmpty, clear } as const;
}
