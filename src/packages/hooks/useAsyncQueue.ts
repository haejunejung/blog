/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useMemo, useState } from "react";

function noop() {}

type UseAsyncQueueTask<T> = (...args: any[]) => T | Promise<T>;

type MapQueueTask<T extends any[]> = {
  [K in keyof T]: UseAsyncQueueTask<T[K]>;
};

interface UseAsyncQueueResult<T> {
  state: "aborted" | "fulfilled" | "pending" | "rejected";
  data: T | null;
}

interface UseAsyncQueueOptions {
  interrupt?: boolean;
  onError?: () => void;
  onFinished?: () => void;
  signal?: AbortSignal;
}

interface UseAsyncQueueReturn<T> {
  result: T;
}

export default function useAsyncQueue<T extends any[], S = MapQueueTask<T>>(
  tasks: S & Array<UseAsyncQueueTask<any>>,
  options?: UseAsyncQueueOptions
): UseAsyncQueueReturn<{ [P in keyof T]: UseAsyncQueueResult<T[P]> }> {
  const {
    interrupt = true,
    onError = noop,
    onFinished = noop,
    signal,
  } = options || {};

  const promiseState: Record<
    UseAsyncQueueResult<T>["state"],
    UseAsyncQueueResult<T>["state"]
  > = {
    aborted: "aborted",
    fulfilled: "fulfilled",
    pending: "pending",
    rejected: "rejected",
  };

  const defaultValue = useMemo(
    () =>
      tasks.map(() => ({
        state: promiseState.pending,
        data: null,
      })) as { [P in keyof T]: UseAsyncQueueResult<T[P]> },
    [promiseState.pending, tasks]
  );

  const [result, setResult] =
    useState<{ [P in keyof T]: UseAsyncQueueResult<T[P]> }>(defaultValue);

  useEffect(() => {
    if (tasks.length === 0) {
      onFinished();
      return;
    }

    const executeTasks = async () => {
      const queue: { [P in keyof T]: UseAsyncQueueResult<T[P]> } = [
        ...defaultValue,
      ];

      await tasks.reduce(async (prevPromise, currentTask, index) => {
        await prevPromise;
        if (signal?.aborted) {
          queue[index] = {
            state: promiseState.aborted,
            data: new Error("aborted"),
          };
          return;
        }
        if (queue[index].state === promiseState.rejected && interrupt) {
          return;
        }
        try {
          const data = await currentTask();
          queue[index] = { state: promiseState.fulfilled, data: data };
        } catch (error) {
          queue[index] = { state: promiseState.rejected, data: error };
          onError();
        }
      }, Promise.resolve());

      onFinished();
      setResult(queue);
    };

    executeTasks();
  }, [
    defaultValue,
    interrupt,
    onError,
    onFinished,
    promiseState.aborted,
    promiseState.fulfilled,
    promiseState.rejected,
    signal?.aborted,
    tasks,
  ]);

  return { result };
}
