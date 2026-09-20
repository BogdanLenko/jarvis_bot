export const withTimeout = async (promise: any, ms: number) => {
  let timer: Timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve({timedOut: true}), ms)
  })
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer))
}
