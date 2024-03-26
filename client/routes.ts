// An array of routes that are accessible to the public
// These routes do not require authentication
export const publicRoutes = ['/', '/not-found'];

// An array of routes that are used for authentication
// These routes will redirect logged in users to /dashboard
export const authRoutes = ['/auth/signup'];

// Prefixes for API authentication routes
// Routes that start with any of these prefixes are used for API authentication purposes
export const apiAuthPrefix = ['/api/auth', '/api/github'];

// The default redirect path after logging in
export const DEFAULT_LOGIN_REDIRECT = '/dashboard';
