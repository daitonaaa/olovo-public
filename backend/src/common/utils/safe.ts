export const safe = async <T = void>(runner: () => T | Promise<T>) => {
  try {
    const res = await runner();
    return res;
  } catch {
    // silence
  }
};
