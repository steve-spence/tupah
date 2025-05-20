

export function getOrCreateAnonId(eventId: string): string {
    const key = `anonId-${eventId}`;
    let id = localStorage.getItem(key);
    if (!id) {
        id = crypto.randomUUID();
        localStorage.setItem(key, id);
    }
    return id;
}