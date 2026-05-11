import { useState, useMemo } from 'react';
import { SF3BABattlecards, CARD_CLASSES, ELEMENTS, normaliseTypes } from '../../data/cards/battlecards';
import { useCardTracker } from '../../hooks/useCardTracker';

export default function SF3BlackAcePage() {
    const [search, setSearch] = useState('');
    const [classFilter, setClassFilter] = useState('ALL');
    const [elementFilter, setElementFilter] = useState('ALL');
    const [obtainedFilter, setObtainedFilter] = useState('ALL');

    const { isObtained, toggleCard } = useCardTracker();

    const cards = useMemo(() => {
        return SF3BABattlecards
            .filter(c => {
                if (classFilter !== 'ALL' && c.cardClass !== classFilter) return false;
                if (elementFilter !== 'ALL') {
                    const types = normaliseTypes(c.types);
                    if (!types.includes(elementFilter)) return false;
                }
                if (obtainedFilter === 'OBTAINED' && !isObtained(c.id)) return false;
                if (obtainedFilter === 'MISSING' && isObtained(c.id)) return false;
                if (search) {
                    const q = search.toLowerCase();
                    return (
                        c.name.toLowerCase().includes(q) ||
                        c.nameJP?.toLowerCase().includes(q) ||
                        c.description.toLowerCase().includes(q)
                    );
                }
                return true;
            });
    }, [search, classFilter, elementFilter, obtainedFilter, isObtained]);

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
            <h1>Star Force 3 — Black Ace</h1>
            <p style={{ color: '#555', marginBottom: '24px' }}>{cards.length} cards</p>

            {/* Filters */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <input
                    type="text"
                    placeholder="Search by name, Japanese name, or description..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ padding: '8px 12px', fontSize: '14px', borderRadius: '6px', border: '1px solid #ccc', maxWidth: '400px' }}
                />

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <strong>Class:</strong>
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

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <strong>Element:</strong>
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

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <strong>Status:</strong>
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
            </div>

            {/* Card list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cards.map((card, index) => {
                    const types = normaliseTypes(card.types);
                    const obtained = isObtained(card.id);
                    return (
                        <div
                            key={`${card.id}-${index}`}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '12px 16px',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                                background: obtained ? '#f0fff4' : 'white',
                            }}
                        >
                            <button
                                onClick={() => toggleCard(card.id)}
                                style={{ fontSize: '20px', background: 'none', border: 'none', cursor: 'pointer' }}
                            >
                                {obtained ? '✅' : '⬜'}
                            </button>

                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                    <strong>{card.id.split('-')[2]}</strong>
                                    <strong>{card.name}</strong>
                                    {card.nameJP && <span style={{ fontSize: '13px', color: '#888' }}>{card.nameJP}</span>}
                                </div>
                                <div style={{ fontSize: '13px', color: '#555' }}>{card.description}</div>
                            </div>

                            <div style={{ fontSize: '13px', color: '#555', textAlign: 'right' }}>
                                <div>{types.join(', ')}</div>
                                {card.damage > 0 && <div>{card.damage} dmg</div>}
                            </div>
                        </div>
                    );
                })}

                {cards.length === 0 && (
                    <p style={{ color: '#888' }}>No cards match your filters.</p>
                )}
            </div>
        </div>
    );
}