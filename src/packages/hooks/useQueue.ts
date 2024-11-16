import { useCallback, useState } from "react";

interface useQueueReturn<T> {
  queue: T[];
  enqueue(item: T): void;
  dequeue(): T | null;
  front(): T | null;
  size(): number;
  isEmpty(): boolean;
  clear(): void;
}

export default function useQueue<T>(
  defaultValues: T[] = []
): useQueueReturn<T> {
  const [queue, setQueue] = useState<T[]>(defaultValues);

  const enqueue = useCallback((item: T) => {
    setQueue((prevQueue) => [...prevQueue, item]);
  }, []);

  const dequeue = useCallback(() => {
    if (queue.length > 0) {
      const front = queue[0];
      setQueue((prevQueue) => prevQueue.slice(1));
      return front;
    }

    return null;
  }, [queue]);

  const front = useCallback(() => {
    if (queue.length > 0) {
      return queue[0];
    }

    return null;
  }, [queue]);

  const size = useCallback(() => {
    return queue.length;
  }, [queue]);

  const isEmpty = useCallback(() => {
    return queue.length === 0;
  }, [queue]);

  const clear = useCallback(() => {
    setQueue([]);
  }, []);

  return { queue, enqueue, dequeue, front, size, isEmpty, clear } as const;
}
