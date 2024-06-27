import { TValidFiles } from "../types/index.type";

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

export const SUPPORTED_IMAGE_FORMATES: TValidFiles = {
  formates: ["image/gif", "image/jpeg", "image/png", "image/webp", "image/jpg"],
  size: 3,
};

export const COMPRESSED_FILE: TValidFiles = {
  formates: ["application/x-zip-compressed"],
  size: 100,
};

export const luciedConf = {
  size: 16,
  strokeWidth: 1,
};

export const CATEGORIES_DATA: string[] = [
  "Finance",
  "Education",
  "Food",
  "Jobs",
  "Entertainment",
  "Travel",
  "Art & Crafts",
  "Fitness & Wellness",
  "Home & Wellness",
  "Fiction & Fantasy",
  "Comedy",
  "History & Culture",
  "Theatre",
  "Environment",
  "Relationships",
  "Marketing",
  "Fitness",
  "Business",
  "Photography",
  "News and Politics",
  "Astrology",
  "Beauty and Makeup",
  "Cartoons",
  "Crypto",
  "Dance",
  "Design",
  "Fashion & Lifestyle",
  "Gaming",
  "Health",
  "Hobbies",
  "Mentorship",
  "Motivation",
  "Music",
  "Non-profit",
  "Parenting",
  "Pets & Animals",
  "Religion",
  "Spirituality",
  "Startups",
  "Technology",
];
