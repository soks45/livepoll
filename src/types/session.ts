declare module 'express-session' {
    interface SessionData {
        userId: number | undefined;
    }
}
export default 'express-session';
