import { hash, verify } from "@node-rs/argon2";

/** Argon2id. Numeric value of Algorithm.Argon2id (const enum is unusable with isolatedModules). */
const ARGON2ID = 2;

const argon2id = {
  algorithm: ARGON2ID,
  memoryCost: 19456,
  timeCost: 2,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  return hash(password, argon2id);
}

export async function verifyPassword(passwordHash: string, password: string) {
  return verify(passwordHash, password);
}
