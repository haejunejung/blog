import { renderHook } from "@testing-library/react";
import useQueue from "./useQueue";

describe("useQueue", () => {
  describe("반환 값 체크", () => {
    const { result } = renderHook(useQueue<number>);
    const { queue, enqueue, dequeue, front, size, isEmpty, clear } =
      result.current;

    it("queue 타입은 Array이다.", () => {
      expectTypeOf(queue).toBeArray();
    });

    it("enqueue 타입은 function이다.", () => {
      expectTypeOf(enqueue).toBeFunction();
    });

    it("dequeue 타입은 function이다.", () => {
      expectTypeOf(dequeue).toBeFunction();
    });

    it("front 타입은 function이다.", () => {
      expectTypeOf(front).toBeFunction();
    });

    it("size 타입은 function이다.", () => {
      expectTypeOf(size).toBeFunction();
    });

    it("isEmpty 타입은 function이다.", () => {
      expectTypeOf(isEmpty).toBeFunction();
    });

    it("clear 타입은 function이다.", () => {
      expectTypeOf(clear).toBeFunction();
    });
  });

  describe("초기 값 체크", () => {
    it("기본 값은 비어있다.", () => {
      const { result } = renderHook(useQueue<number>);
      const { queue } = result.current;
      expect(queue).toStrictEqual([]);
    });

    it("기본 값에 배열을 넣을 수 있다.", () => {
      const { result } = renderHook(() => useQueue<number>([1, 2, 3]));
      const { queue } = result.current;
      expect(queue).toStrictEqual([1, 2, 3]);
    });
  });
});
