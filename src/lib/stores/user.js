import { writable } from 'svelte/store';

// Create a writable store for user data
export const userStore = writable(null);

// Helper function to check if user is logged in
export const isLoggedIn = (user) => {
    return user && Object.keys(user).length > 0;
};
