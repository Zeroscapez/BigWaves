import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CARD_CLASSES } from '../data/cards/battlecards';
import { useCardTracker } from '../hooks/useCardTracker';
import { SF3BABattlecards } from '../data/cards/battlecards';
import { SF3RJBattlecards } from '../data/cards/battlecards';

const TABS = [
    { key: 'SF3BA', label: 'SF3 Black Ace', to: '/cards/sf3-black-ace' },
    { key: 'SF3RJ', label: 'SF3 Red Joker', to: '/cards/sf3-red-joker' },
];
const CARD_POOLS = {
    SF3BA: SF3BABattlecards,
    SF3RJ: SF3RJBattlecards,
};

function ProgressBar({ value, max, label }) {
    const pct = max > 0 ? (value / max) * 100 : 0;
    return (
        <div style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '14px' }}>{label}</span>
                <span style={{ fontSize: '14px', color: '#555' }}>{value} / {max}</span>
            </div>
            <div style={{ background: '#eee', borderRadius: '4px', height: '10px', overflow: 'hidden' }}>
                <div style={{
                    width: `${pct}%`,
                    height: '100%',
                    background: '#4a90e2',
                    borderRadius: '4px',
                    transition: 'width 0.3s ease',
                }} />
            </div>
        </div>
    );
}

export default function CardsPage() {
    const [activeTab, setActiveTab] = useState('SF3BA');
    const { obtained } = useCardTracker();

    const gameCards = CARD_POOLS[activeTab] || [];
    const totalObtained = gameCards.filter(c => obtained.has(c.id)).length;

    const byClass = Object.keys(CARD_CLASSES).map(key => {
        const cards = gameCards.filter(c => c.cardClass === key);
        const got = cards.filter(c => obtained.has(c.id)).length;
        return { key, label: CARD_CLASSES[key], total: cards.length, obtained: got };
    });

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
            <h1>Card Library</h1>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px', borderBottom: '2px solid #eee' }}>
                {TABS.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        style={{
                            padding: '10px 20px',
                            border: 'none',
                            borderBottom: activeTab === tab.key ? '2px solid #4a90e2' : '2px solid transparent',
                            background: 'none',
                            fontWeight: activeTab === tab.key ? 'bold' : 'normal',
                            color: activeTab === tab.key ? '#4a90e2' : '#555',
                            cursor: 'pointer',
                            marginBottom: '-2px',
                            fontSize: '15px',
                        }}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Progress section */}
            <div style={{ marginTop: '32px', maxWidth: '480px' }}>
                <h2 style={{ marginBottom: '20px' }}>
                    {TABS.find(t => t.key === activeTab)?.label} — {totalObtained} / {gameCards.length} obtained
                </h2>

                {byClass.map(({ key, label, total, obtained: got }) => (
                    <ProgressBar
                        key={key}
                        label={label}
                        value={got}
                        max={total}
                    />
                ))}
            </div>

            {/* Link to full card list */}
            <div style={{ marginTop: '32px' }}>
                <Link
                    to={TABS.find(t => t.key === activeTab)?.to}
                    style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        background: '#4a90e2',
                        color: 'white',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    View All {TABS.find(t => t.key === activeTab)?.label} Cards →
                </Link>
            </div>
        </div>
    );
}