// set session storage
export function SetSessionStorage() {
    const id = Math.random();
    sessionStorage.setItem(`${process.env.NEXT_PUBLIC_SESSION_ID}`, `${id}`);
}
// get session storage
export function GetSessionStorage(): string | null {
    const id = sessionStorage.getItem(`${process.env.NEXT_PUBLIC_SESSION_ID}`);
    return id;
}
// remove session storage
export function RemoveSessionStorage() {
    sessionStorage.removeItem(`${process.env.NEXT_PUBLIC_SESSION_ID}`);
}
// initialize session storage
export function ClearSessionStorage() {
    sessionStorage.clear;
}
