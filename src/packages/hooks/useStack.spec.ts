import { act, renderHook } from "@testing-library/react";
import useStack from "./useStack";

describe("useStack", () => {
  describe("반환 값 타입 체크", () => {
    const { result } = renderHook(useStack<number>);

    const { push, pop, peek, size, isEmpty } = result.current;

    it("push 타입은 function이다.", () => {
      expectTypeOf(push).toBeFunction();
    });

    it("pop 타입은 function이다.", () => {
      expectTypeOf(pop).toBeFunction();
    });

    it("peek 타입은 function이다.", () => {
      expectTypeOf(peek).toBeFunction();
    });

    it("size 타입은 function이다.", () => {
      expectTypeOf(size).toBeFunction();
    });

    it("isEmpty 타입은 function이다.", () => {
      expectTypeOf(isEmpty).toBeFunction();
    });
  });

  describe("초기 설정 값 체크", () => {
    it("기본 값은 비어 있다.", () => {
      const { result } = renderHook(useStack<number>);
      const { stack } = result.current;
      expect(stack).toStrictEqual([]);
    });

    it("기본 값에 배열을 넣는다.", () => {
      const { result } = renderHook(() => useStack<number>([1, 2, 3]));
      const { stack } = result.current;
      expect(stack).toStrictEqual([1, 2, 3]);
    });
  });

  describe("메서드 체크", () => {
    it("push하면 배열에 값이 추가된다.", async () => {
      const { result } = renderHook(useStack<number>);
      const { push } = result.current;

      await act(async () => push(1));
      expect(result.current.stack).toStrictEqual([1]);
    });

    it("pop하면 배열에 값이 제거된다.", async () => {
      const { result } = renderHook(() => useStack<number>([1, 2, 3]));
      const { pop } = result.current;

      await act(async () => {
        const poppedItem = pop();
        expect(poppedItem).toBe(3);
      });

      expect(result.current.stack).toStrictEqual([1, 2]);
    });

    it("빈 배열에서 pop을 진행하면 null을 반환한다.", async () => {
      const { result } = renderHook(useStack<number>);
      const { pop } = result.current;
      expect(pop()).toBeNull();
    });

    it("peek하면 가장 상단의 값을 가져온다.", async () => {
      const { result } = renderHook(useStack<number>);
      const { push } = result.current;
      await act(async () => push(1));
      expect(result.current.peek()).toBe(1);

      await act(async () => push(2));
      expect(result.current.peek()).toBe(2);
    });

    it("빈 배열에서 peek을 진행하면 null을 반환한다.", () => {
      const { result } = renderHook(useStack<number>);
      const { peek } = result.current;
      expect(peek()).toBeNull();
    });

    it("size하면 스택의 개수를 반환한다.", async () => {
      const { result } = renderHook(() => useStack<number>([1, 2, 3]));
      const { size } = result.current;
      expect(size()).toBe(3);
    });

    it("isEmpty는 비어 있을 때 true, 비어 있지 않을 때 false를 반환한다.", async () => {
      const { result } = renderHook(useStack<number>);
      const { push } = result.current;

      expect(result.current.isEmpty()).toBeTruthy();
      await act(async () => push(1));
      expect(result.current.isEmpty()).toBeFalsy();
    });

    it("clear를 하면 스택 내 모든 데이터를 제거한다.", async () => {
      const { result } = renderHook(() => useStack<number>([1, 2, 3]));
      const { clear } = result.current;
      await act(async () => clear());

      expect(result.current.isEmpty()).toBeTruthy();
    });
  });
});
