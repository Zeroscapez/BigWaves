import { useState, useMemo } from 'react';
import { battlecards, GAMES, CARD_CLASSES, ELEMENTS, normaliseTypes } from '../data/battlecards';
import { useCardTracker } from '../hooks/useCardTracker';

export default function CardsPage() {
    const [gameFilter, setGameFilter] = useState('ALL');
    const [classFilter, setClassFilter] = useState('ALL');
    const [elementFilter, setElementFilter] = useState('ALL');
    const [obtainedFilter, setObtainedFilter] = useState('ALL');
    const [search, setSearch] = useState('');

    const { isObtained, toggleCard } = useCardTracker();

    const filtered = useMemo(() => {
        return battlecards.filter(card => {

            if (gameFilter !== 'ALL' && card.game !== gameFilter) return false;
            if (classFilter !== 'ALL' && card.cardClass !== classFilter) return false;
            if (obtainedFilter === 'OBTAINED' && !isObtained(card.id)) return false;
            if (obtainedFilter === 'MISSING' && isObtained(card.id)) return false;
            if (elementFilter !== 'ALL') {
                const types = normaliseTypes(card.types);
                if (!types.includes(elementFilter)) return false;
            }


            if (search) {
                const q = search.toLowerCase();
                return (
                    card.name.toLowerCase().includes(q) ||
                    card.nameJP.toLowerCase().includes(q) ||
                    card.description.toLowerCase().includes(q) ||
                    card.id.split('-')[1].toLowerCase().includes(q)
                );
            }
            return true;
        });
    }, [gameFilter, classFilter, elementFilter, obtainedFilter, search, isObtained]);

    return (
        <div>
            <h1>Card Library</h1>
            <p>{filtered.length} cards</p>

            <input
                type="text"
                placeholder="Search by name, Japanese name, or description..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div>
                <strong>Game: </strong>
                {['ALL', ...Object.keys(GAMES)].map(g => (
                    <button
                        key={g}
                        onClick={() => setGameFilter(g)}
                        style={{ fontWeight: gameFilter === g ? 'bold' : 'normal' }}
                    >
                        {g === 'ALL' ? 'All' : GAMES[g]}
                    </button>
                ))}
            </div>

            <div>
                <strong>Class: </strong>
                {['ALL', ...Object.keys(CARD_CLASSES)].map(c => (
                    <button
                        key={c}
                        onClick={() => setClassFilter(c)}
                        style={{ fontWeight: classFilter === c ? 'bold' : 'normal' }}
                    >
                        {c === 'ALL' ? 'All' : CARD_CLASSES[c]}
                    </button>
                ))}
            </div>

            <div>
                <strong>Element: </strong>
                {['ALL', ...Object.keys(ELEMENTS)].map(e => (
                    <button
                        key={e}
                        onClick={() => setElementFilter(e)}
                        style={{ fontWeight: elementFilter === e ? 'bold' : 'normal' }}
                    >
                        {e === 'ALL' ? 'All' : ELEMENTS[e]}
                    </button>
                ))}
            </div>
            <div>
                <strong>Status: </strong>
                {['ALL', 'OBTAINED', 'MISSING'].map(o => (
                    <button
                        key={o}
                        onClick={() => setObtainedFilter(o)}
                        style={{ fontWeight: obtainedFilter === o ? 'bold' : 'normal' }}
                    >
                        {o === 'ALL' ? 'All' : o === 'OBTAINED' ? 'Obtained' : 'Missing'}
                    </button>
                ))}
            </div>

            <div>
                {filtered.map(card => {
                    const types = normaliseTypes(card.types);
                    return (
                        <div key={card.id} style={{ border: '1px solid gray', margin: '8px', padding: '8px' }}>
                            <strong >Game:  {card.game}</strong>
                            <br />
                            <strong >Class:  {card.cardClass}</strong>
                            <br />
                            <strong>{card.id.split('-')[1]}: {card.name}</strong>
                            {card.nameJP && <span style={{ marginLeft: '8px', color: 'gray' }}>{card.nameJP}</span>}

                            <div>Type(s): {types.join(', ')}</div>
                            {card.damage > 0 && <div>Attack: {card.damage}</div>}
                            {card.upgrades?.length > 0 && <div>Upgrades: {card.upgrades.join(', ')}</div>}
                            <p>{card.description}</p>
                            <button onClick={() => toggleCard(card.id)}>
                                {isObtained(card.id) ? '✅ Obtained' : '⬜ Not obtained'}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}