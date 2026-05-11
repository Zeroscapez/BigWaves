import { SF3BAVersionExclusiveCards } from './Starforce3/sf3-black-ace';
import { SF33RJVersionExclusiveCards } from './Starforce3/sf3-red-joker';
import { sf3battlecards } from './Starforce3/sf3battlecards';


export const TYPE_MAP = {
    'Null': 'NULL',
    'None': 'NONE',
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
    NULL: 'Null',
    FIRE: 'Fire',
    AQUA: 'Aqua',
    ELEC: 'Elec',
    WOOD: 'Wood',

};

export const ATTRIBUTES = {
    SWORD: 'Sword',
    WIND: 'Wind',
    BREAK: 'Break',
    CURSOR: 'Cursor',
    RECOVER: 'Recover',
}

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



export const SF3BABattlecards = [
    ...sf3battlecards.map(c => ({ ...c, id: `sf3ba-${c.id}` })),
    ...SF3BAVersionExclusiveCards.map(c => ({ ...c, id: `sf3ba-${c.id}` }))
];

export const SF3RJBattlecards = [
    ...sf3battlecards.map(c => ({ ...c, id: `sf3rj-${c.id}` })),
    ...SF33RJVersionExclusiveCards.map(c => ({ ...c, id: `sf3rj-${c.id}` }))

];