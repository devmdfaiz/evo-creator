import { TFieldDetails } from "../types/index.type";

export const defaultFieldValue: TFieldDetails[] = [
  { type: "text-text", placeholder: "Full Name", required: true },
  { type: "number-phone", placeholder: "Phone Number", required: true },
  { type: "email-email", placeholder: "Email", required: true },
];

export const pageThemeProvider = (theme: string) =>
  `${theme === "dark" ? "bg-black text-white" : "bg-white text-black"}`;

export const pageInputThemeProvider = (theme: string) =>
  `${theme === "light" ? "border-black/50" : "border-white/50"}`;

export const pageInputBackgroundThemeProvider = (theme: string) =>
  `${
    theme === "dark"
      ? "bg-black text-white border-white/50"
      : "bg-white text-black border-black/50"
  }`;

export const pageStrikeTextThemeProvider = (theme: string) =>
  `${theme === "dark" ? "text-white/60" : "text-black/60"}`;
