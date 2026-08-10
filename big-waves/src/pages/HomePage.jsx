import { Link } from 'react-router-dom';
import { useCardTracker } from '../hooks/useCardTracker';
import { SF3BABattlecards } from '../data/cards/battlecards';
import { SF3RJBattlecards } from '../data/cards/battlecards';
import styles from './css/HomePage.module.css';

const GAME_CARDS = [
    {
        key: 'SF3BA',
        title: 'Mega Man Star Force 3',
        subtitle: 'Black Ace',
        to: '/cards/sf3-black-ace',
        coverArt: '/assets/coverart/sf3-black-ace.png',
        accentColor: '#00f5ff',
        releaseDates: { JP: 'July 30, 2008', NA: 'November 4, 2008' },
        cards: SF3BABattlecards,
    },
    {
        key: 'SF3RJ',
        title: 'Mega Man Star Force 3',
        subtitle: 'Red Joker',
        to: '/cards/sf3-red-joker',
        coverArt: '/assets/coverart/sf3-red-joker.png',
        accentColor: '#ff3d5a',
        releaseDates: { JP: 'July 30, 2008', NA: 'November 4, 2008' },
        cards: SF3RJBattlecards,
    },
];

function ProgressBar({ value, max, color }) {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className={styles.progressWrapper}>
            <div className={styles.progressTrack}>
                <div
                    className={styles.progressFill}
                    style={{ width: `${pct}%`, background: color, boxShadow: `0 0 8px ${color}` }}
                />
            </div>
            <div className={styles.progressLabel}>
                <span>{value} / {max} cards</span>
                <span>{pct}%</span>
            </div>
        </div>
    );
}

export default function HomePage() {
    const { obtained } = useCardTracker();

    return (
        <div className={styles.page}>

            {/* Star field */}
            <div className={styles.stars} />

            {/* Hero */}
            <section className={styles.hero}>
                <div className={styles.heroEyebrow}>EM WAVE SYSTEM ONLINE</div>
                <h1 className={styles.heroTitle}>
                    <span className={styles.heroTitleTop}>BIG WAVES</span>
                    <span className={styles.heroTitleBottom}>BATTLECARD TRACKER</span>
                </h1>
                <p className={styles.heroSubtitle}>
                    Track your Mega Man Star Force battlecard collection.<br />
                    Find enemies, complete your library, build your folder.
                </p>
            </section>

            {/* Game cards */}
            <section className={styles.gamesSection}>
                <div className={styles.sectionLabel}>SELECT GAME</div>
                <div className={styles.gameGrid}>
                    {GAME_CARDS.map(game => {
                        const total = game.cards.length;
                        const got = game.cards.filter(c => obtained.has(c.id)).length;
                        return (
                            <Link key={game.key} to={game.to} className={styles.gameCard} style={{ '--accent': game.accentColor }}>
                                <div className={styles.gameCardGlow} />

                                {/* Cover art */}
                                <div className={styles.coverArtWrapper}>
                                    <img
                                        src={game.coverArt}
                                        alt={`${game.title} ${game.subtitle}`}
                                        className={styles.coverArt}
                                        onError={e => { e.target.style.display = 'none'; }}
                                    />
                                    <div className={styles.coverArtOverlay} />
                                </div>

                                {/* Card info */}
                                <div className={styles.gameCardBody}>
                                    <div className={styles.gameCardMeta}>{game.title}</div>
                                    <h2 className={styles.gameCardTitle}>{game.subtitle}</h2>

                                    <div className={styles.releaseDates}>
                                        <div className={styles.releaseDate}>
                                            <span className={styles.releaseDateFlag}>JP</span>
                                            <span>{game.releaseDates.JP}</span>
                                        </div>
                                        <div className={styles.releaseDate}>
                                            <span className={styles.releaseDateFlag}>NA</span>
                                            <span>{game.releaseDates.NA}</span>
                                        </div>
                                    </div>

                                    <ProgressBar value={got} max={total} color={game.accentColor} />

                                    <div className={styles.gameCardCta}>
                                        VIEW CARDS <span className={styles.ctaArrow}>→</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}