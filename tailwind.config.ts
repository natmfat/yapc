import type { Config } from "tailwindcss";
import { tailwindConfig } from "natmfat/integrations/tailwind";

export default {
  ...tailwindConfig,
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
} satisfies Config;
