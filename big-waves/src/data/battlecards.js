import { sf3cards } from "./Starforce3/sf3cardlibrary";


export const TYPE_MAP = {
    'Null': 'NULL',
    'None': 'NULL',
    'Heat': 'FIRE',
    'Fire': 'FIRE',
    'Aqua': 'AQUA',
    'Elec': 'ELEC',
    'Wood': 'WOOD',
    'Sword': 'SWORD',
    'Wind': 'WIND',
    'Break': 'BREAK',
    'Cursor': 'CURSOR',
    'Recover': 'RECOVER',
};

export function normaliseTypes(rawTypes) {
    if (!rawTypes || rawTypes.length === 0) return ['NONE'];
    const cleaned = rawTypes.map(t =>
        TYPE_MAP[t.replace('BC Element ', '').replace('BC Attribute ', '').trim()] || 'NONE'
    );
    const unique = [...new Set(cleaned)];
    return unique.length > 1 ? unique.filter(t => t !== 'NONE') : unique;
}

export const ELEMENTS = {
    NONE: 'None',
    FIRE: 'Fire',
    AQUA: 'Aqua',
    ELEC: 'Elec',
    WOOD: 'Wood',
    SWORD: 'Sword',
    WIND: 'Wind',
    BREAK: 'Break',
    CURSOR: 'Cursor',
    RECOVER: 'Recover',
};

export const GAMES = {
    SF1: 'Star Force 1',
    SF2: 'Star Force 2',
    SF3: 'Star Force 3',
};

export const CARD_CLASSES = {
    STANDARD: 'Standard',
    MEGA: 'Mega',
    GIGA: 'Giga',
};

export const battlecards = [
    ...sf3cards,
];