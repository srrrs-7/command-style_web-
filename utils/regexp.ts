import { time } from 'console';

export function timeRegexp(time: string): string {
    const t = new RegExp(/\d*-\d*-\d*/, 'g');
    const result = time.match(t);
    return result?.join('')!;
}

export function emailRegexp(email: string): string {
    const t = new RegExp('w+([-+.]w+)*@w+([-.]w+)*.w+([-.]w+)*$', 'g');
    const result = email.match(t);
    console.log(result);
    return result?.join('')!;
}
