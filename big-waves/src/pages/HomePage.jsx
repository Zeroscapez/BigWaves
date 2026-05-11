import { Link } from 'react-router-dom';

import { useCardTracker } from '../hooks/useCardTracker';
import { SF3BABattlecards } from '../data/cards/battlecards';
import { SF3RJBattlecards } from '../data/cards/battlecards';

const GAME_CARDS = [
    {
        key: 'SF3BA',
        cards: SF3BABattlecards,
        title: 'Mega Man Star Force 3',
        subtitle: 'Black Ace',
        to: '/cards/sf3-black-ace',
        coverArt: '/src/assets/coverart/sf3-black-ace.png',
        releaseDates: {
            JP: 'July 30, 2008',
            NA: 'November 4, 2008',
        },
    },
    {
        key: 'SF3RJ',
        cards: SF3RJBattlecards,
        title: 'Mega Man Star Force 3',
        subtitle: 'Red Joker',
        to: '/cards/sf3-red-joker',
        coverArt: '/src/assets/coverart/sf3-red-joker.png',
        releaseDates: {
            JP: 'July 30, 2008',
            NA: 'November 4, 2008',
        },
    },
];

function ProgressBar({ value, max }) {
    const percentage = max > 0 ? (value / max) * 100 : 0;
    return (
        <div style={{ background: '#eee', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
            <div style={{
                width: `${percentage}%`,
                height: '100%',
                background: '#4a90e2',
                borderRadius: '4px',
                transition: 'width 0.3s ease',
            }} />
        </div>
    );
}

export default function HomePage() {
    const { obtained } = useCardTracker();

    return (
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px' }}>
            <h1>SF Tracker</h1>
            <p>Track your Mega Man Star Force battlecard collection.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px', marginTop: '40px' }}>
                {GAME_CARDS.map(game => {
                    const gameCards = game.cards;
                    const gameObtained = gameCards.filter(c => obtained.has(c.id)).length;

                    return (
                        <Link
                            key={game.key}
                            to={game.to}
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div style={{ border: '1px solid #ccc', borderRadius: '8px', overflow: 'hidden' }}>

                                {/* Cover art */}
                                <div style={{ height: '200px', background: '#f0f0f0', overflow: 'hidden' }}>
                                    <img
                                        src={game.coverArt}
                                        alt={`${game.title} ${game.subtitle}`}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                </div>

                                {/* Info */}
                                <div style={{ padding: '16px' }}>
                                    <div style={{ fontSize: '13px', color: '#888' }}>{game.title}</div>
                                    <h2 style={{ fontSize: '20px', margin: '4px 0 12px' }}>{game.subtitle}</h2>

                                    <div style={{ fontSize: '13px', color: '#555', marginBottom: '16px' }}>
                                        <div>🇯🇵 {game.releaseDates.JP}</div>
                                        <div>🇺🇸 {game.releaseDates.NA}</div>
                                    </div>

                                    <ProgressBar value={gameObtained} max={gameCards.length} />
                                    <div style={{ fontSize: '13px', color: '#555', marginTop: '6px' }}>
                                        {gameObtained} / {gameCards.length} cards obtained
                                    </div>
                                </div>

                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}