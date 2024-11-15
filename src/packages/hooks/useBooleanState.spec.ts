import { act, renderHook } from "@testing-library/react";
import useBooleanState from "./useBooleanState";

describe("useBooleanState", () => {
  describe("반환 값 타입 체크", () => {
    const { result } = renderHook(useBooleanState);

    const { bool, setTrue, setFalse, toggle } = result.current;

    it("bool 타입은 boolean이다.", () => {
      expectTypeOf(bool).toBeBoolean();
    });

    it("setTrue 타입은 function이다.", () => {
      expectTypeOf(setTrue).toBeFunction();
    });

    it("setFalse 타입은 function이다.", () => {
      expectTypeOf(setFalse).toBeFunction();
    });

    it("toggle 타입은 function이다.", () => {
      expectTypeOf(toggle).toBeFunction();
    });
  });

  describe("초기값 체크", () => {
    it("기본 설정 값은 false이다.", () => {
      const { result } = renderHook(useBooleanState);
      const { bool } = result.current;
      expect(bool).toBeFalsy();
    });

    it("기본 설정 값을 true로 설정할 수 있다.", () => {
      const { result } = renderHook(() => useBooleanState(true));
      const { bool } = result.current;
      expect(bool).toBeTruthy();
    });

    it("기본 설정 값을 false로 설정할 수 있다.", () => {
      const { result } = renderHook(() => useBooleanState(false));
      const { bool } = result.current;
      expect(bool).toBeFalsy();
    });
  });

  describe("함수로 상태값을 변경할 수 있다.", () => {
    it("setTrue를 사용하면 bool값이 true로 변한다", async () => {
      const { result } = renderHook(useBooleanState);
      const { bool, setTrue } = result.current;
      expect(bool).toBeFalsy();
      await act(async () => setTrue());
      expect(result.current.bool).toBeTruthy();
    });

    it("setFalse를 사용하면 bool값이 false로 변한다", async () => {
      const { result } = renderHook(() => useBooleanState(true));
      const { bool, setFalse } = result.current;
      expect(bool).toBeTruthy();
      await act(async () => setFalse());
      expect(result.current.bool).toBeFalsy();
    });

    it("toggle를 사용하면 bool값이 토글된다.", async () => {
      const { result } = renderHook(useBooleanState);
      const { bool, toggle } = result.current;
      expect(bool).toBeFalsy();
      await act(async () => toggle());
      expect(result.current.bool).toBeTruthy();
      await act(async () => toggle());
      expect(result.current.bool).toBeFalsy();
    });
  });
});
