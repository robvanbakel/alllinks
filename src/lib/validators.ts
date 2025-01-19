import { z } from "zod";

export const profileDisplayName = z.string().min(2);
export const profileUsername = z.string().min(3).max(32);
