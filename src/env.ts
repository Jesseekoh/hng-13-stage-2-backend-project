import { config } from "dotenv";
import { z } from "zod";
config();

const envSchema = z.object({
  DATABASE_URL: z.url(),
  PORT: z.coerce.number().positive().default(5000),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "Invalid environment variables:",
    z.flattenError(parsedEnv.error),
  );
  process.exit(1);
}

export default parsedEnv.data;
