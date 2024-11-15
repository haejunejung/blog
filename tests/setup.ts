import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";

// test 간 DOM 상태를 초기화
afterEach(() => {
  cleanup();
});
