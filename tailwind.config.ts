import type { Config } from "tailwindcss";

import * as Colors from "@radix-ui/colors";

function generateScale(name: keyof typeof Colors | "palette") {
  const scale = Array.from({ length: 12 }, (_, i) => {
    const id = i + 1;

    if (name.endsWith("A")) {
      const root = name.slice(0, -1);

      return [id, `var(--${root}-a${id})`];
    }

    return [id, `var(--${name}-${id})`];
  });

  return Object.fromEntries(scale);
}

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)"],
        sans: ["var(--font-sans)"],
      },
      colors: {
        ...Object.entries(Colors).reduce(
          (acc, [key]) => {
            acc[key] = generateScale(key as keyof typeof Colors);

            return acc;
          },
          {} as Record<string, Record<string, string>>,
        ),
      },
    },
  },
  plugins: [],
} satisfies Config;
