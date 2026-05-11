import { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../../../components/ThemeContext';
import { SF3BABattlecards } from '../../../../data/cards/battlecards';
import { CARD_CLASSES, ELEMENTS } from '../../../../data/cards/battlecards';
import { useCardTracker } from '../../../../hooks/useCardTracker';
import BattleCard from '../../../../components/BattleCard';
import styles from './css/SF3BlackAcePage.module.css';

const ACCENT = '#39ff14';

export default function SF3BlackAcePage() {
    const { setTheme } = useTheme();

    useEffect(() => {
        setTheme('sf3ba');
        return () => setTheme('default');
    }, []);

    const [search, setSearch] = useState('');
    const [classFilter, setClassFilter] = useState('ALL');
    const [elementFilter, setElementFilter] = useState('ALL');
    const [obtainedFilter, setObtainedFilter] = useState('ALL');

    const { isObtained, toggleCard } = useCardTracker();

    const cards = useMemo(() => {
        return SF3BABattlecards.filter(c => {
            if (classFilter !== 'ALL' && c.cardClass !== classFilter) return false;
            if (obtainedFilter === 'OBTAINED' && !isObtained(c.id)) return false;
            if (obtainedFilter === 'MISSING' && isObtained(c.id)) return false;
            if (search) {
                const q = search.toLowerCase();
                return (
                    c.name.toLowerCase().includes(q) ||
                    c.nameJP?.toLowerCase().includes(q) ||
                    c.description?.toLowerCase().includes(q)
                );
            }
            return true;
        });
    }, [search, classFilter, elementFilter, obtainedFilter, isObtained]);

    const total = SF3BABattlecards.length;
    const obtained = SF3BABattlecards.filter(c => isObtained(c.id)).length;

    return (
        <div className={styles.page}>

            {/* Grid overlay */}
            <div className={styles.grid} />

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerEyebrow}>FINALIZED NOISE</div>
                <h1 className={styles.headerTitle}>BLACK ACE</h1>
                <div className={styles.headerProgress}>
                    <div className={styles.progressTrack}>
                        <div
                            className={styles.progressFill}
                            style={{ width: `${total > 0 ? (obtained / total) * 100 : 0}%` }}
                        />
                    </div>
                    <span className={styles.progressLabel}>{obtained} / {total} obtained</span>
                </div>
            </div>

            {/* Filters */}
            <div className={styles.filters}>
                <input
                    type="text"
                    placeholder="Search cards..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className={styles.searchInput}
                />

                <div className={styles.filterRow}>
                    {['ALL', ...Object.keys(CARD_CLASSES)].map(c => (
                        <button
                            key={c}
                            onClick={() => setClassFilter(c)}
                            className={`${styles.filterBtn} ${classFilter === c ? styles.active : ''}`}
                        >
                            {c === 'ALL' ? 'All Classes' : CARD_CLASSES[c]}
                        </button>
                    ))}
                </div>



                <div className={styles.filterRow}>
                    {['ALL', 'OBTAINED', 'MISSING'].map(o => (
                        <button
                            key={o}
                            onClick={() => setObtainedFilter(o)}
                            className={`${styles.filterBtn} ${obtainedFilter === o ? styles.active : ''}`}
                        >
                            {o === 'ALL' ? 'All' : o === 'OBTAINED' ? 'Obtained' : 'Missing'}
                        </button>
                    ))}
                </div>

                <div className={styles.resultCount}>{cards.length} cards</div>
            </div>

            {/* Card grid */}
            <div className={styles.cardGrid}>
                {cards.map((card, index) => (
                    <BattleCard
                        key={`${card.id}-${index}`}
                        card={card}
                        obtained={isObtained(card.id)}
                        onToggle={toggleCard}
                        accentColor={ACCENT}
                    />
                ))}
                {cards.length === 0 && (
                    <div className={styles.empty}>No cards match your filters.</div>
                )}
            </div>
        </div>
    );
}