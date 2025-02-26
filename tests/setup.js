import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";
//Para permitir que os elementos do react sejam testados pelo vitest fazemos o seguinte import
import '@testing-library/jest-dom/vitest';

afterEach(() => {
    cleanup();
});