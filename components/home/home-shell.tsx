"use client";

import { Cursor } from "./cursor";
import { IntroProvider } from "./intro";
import { Preloader } from "./preloader";
import { SmoothScroll } from "./smooth-scroll";

/** Homepage-only: preloader + smooth scroll + shared intro state. */
export function HomeShell({ children }: { children: React.ReactNode }) {
  return (
    <IntroProvider>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      {children}
    </IntroProvider>
  );
}
