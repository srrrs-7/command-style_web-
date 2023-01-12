import { parseCookies, setCookie, destroyCookie } from 'nookies';
import nookies from 'nookies';

// user cookie
export function GetCookie(): string {
    const cookie = nookies.get(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
    const token = cookie[`${process.env.NEXT_PUBLIC_COOKIE_KEY}`];
    return token;
}

export function SetCookie(value: string) {
    setCookie(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`, value, {
        domain: `${process.env.NEXT_PUBLIC_DOMAIN}`,
        maxAge: 24 * 60 * 60,
        path: '/',
        secure: false,
    });
}

// destroy cookie
export function RemoveCookie() {
    destroyCookie(null, `${process.env.NEXT_PUBLIC_COOKIE_KEY}`);
}

// admin cookie
export function GetAdminCookie(): string {
    const cookie = nookies.get(null, `${process.env.NEXT_PUBLIC_ADMIN_COOKIE_KEY}`);
    const token = cookie[`${process.env.NEXT_PUBLIC_ADMIN_COOKIE_KEY}`];
    return token;
}

export function SetAdminCookie(value: string) {
    setCookie(null, `${process.env.NEXT_PUBLIC_ADMIN_COOKIE_KEY}`, value, {
        // domain: 'localhost',
        domain: `${process.env.NEXT_PUBLIC_DOMAIN}`,
        maxAge: 24 * 60 * 60,
        path: '/',
        secure: false,
    });
}

// destroy cookie
export function RemoveAdminCookie() {
    destroyCookie(null, `${process.env.NEXT_PUBLIC_ADMIN_COOKIE_KEY}`);
}
