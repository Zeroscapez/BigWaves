import { normaliseTypes } from '../data/cards/battlecards';
import TypeBadge from './TypeBadge';
import styles from '../css/BattleCard.module.css';

function getCardNumber(id) {
    const parts = id.split('-');
    // Find the numeric part
    const num = parts.find(p => /^\d+$/.test(p));
    return num || '???';
}

export default function BattleCard({ card, obtained, onToggle, accentColor }) {
    const types = normaliseTypes(card.types || []);
    const cardNumber = getCardNumber(card.id);

    return (
        <div
            className={`${styles.card} ${obtained ? styles.obtained : ''}`}
            style={{ '--accent': accentColor }}
        >
            {/* Obtained overlay */}
            {obtained && (
                <div className={styles.obtainedOverlay}>
                    <div className={styles.checkmark}>✓</div>
                </div>
            )}

            {/* Card artwork */}
            <div className={styles.artwork}>
                {card.image ? (
                    <img src={card.image} alt={card.name} className={styles.artworkImg} />
                ) : (
                    <div className={styles.artworkPlaceholder}>
                        <span className={styles.placeholderText}>{card.name}</span>
                    </div>
                )}
            </div>

            {/* Card info */}
            <div className={styles.info}>

                {/* ID + Name row */}
                <div className={styles.nameRow}>
                    <span className={styles.cardNumber}>#{cardNumber}</span>
                    <span className={styles.cardName}>{card.name}</span>
                </div>

                {/* Japanese name */}
                {card.nameJP && (
                    <div className={styles.nameJP}>{card.nameJP}</div>
                )}

                {/* Type badges */}
                <div className={styles.badges}>
                    {types.map(t => <TypeBadge key={t} type={t} />)}
                    {card.damage > 0 && (
                        <span className={styles.damage}>{card.damage}</span>
                    )}
                </div>

                {/* Description */}
                <p className={styles.description}>{card.description}</p>

            </div>

            {/* Obtain button */}
            <button
                className={styles.obtainBtn}
                onClick={() => onToggle(card.id)}
                title={obtained ? 'Mark as not obtained' : 'Mark as obtained'}
            >
                {obtained ? '✓' : '+'}
            </button>
        </div>
    );
}