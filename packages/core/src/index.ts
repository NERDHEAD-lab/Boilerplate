/**
 * Generates a welcome message for a given name.
 * @param name The name to include in the message.
 * @returns A formatted welcome string.
 */
export function getWelcomeMessage(name: string): string {
    if (!name) {
        return 'Welcome!';
    }
    return `Welcome, ${name}! This message is from the core module.`;
}