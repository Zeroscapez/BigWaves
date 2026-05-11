import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'sf-tracker-obtained';

export function useCardTracker() {
    const [obtained, setObtained] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? new Set(JSON.parse(stored)) : new Set();
        } catch {
            return new Set();
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...obtained]));
        } catch {
            // storage full or unavailable
        }
    }, [obtained]);

    const toggleCard = useCallback((id) => {
        setObtained(prev => {
            const next = new Set(prev);
            if (next.has(id)) {
                next.delete(id);
            } else {
                next.add(id);
            }
            return next;
        });
    }, []);

    const isObtained = useCallback((id) => obtained.has(id), [obtained]);

    return { obtained, toggleCard, isObtained };
}