const TYPE_COLORS = {
    FIRE: { bg: 'rgba(255, 80, 30, 0.15)', border: '#ff501e', color: '#ff7a50' },
    AQUA: { bg: 'rgba(0, 180, 255, 0.15)', border: '#00b4ff', color: '#00d4ff' },
    ELEC: { bg: 'rgba(255, 220, 0, 0.15)', border: '#ffdc00', color: '#ffe840' },
    WOOD: { bg: 'rgba(50, 200, 80, 0.15)', border: '#32c850', color: '#50e870' },
    SWORD: { bg: 'rgba(180, 80, 255, 0.15)', border: '#b450ff', color: '#cc80ff' },
    WIND: { bg: 'rgba(100, 200, 255, 0.15)', border: '#64c8ff', color: '#90d8ff' },
    BREAK: { bg: 'rgba(255, 140, 0, 0.15)', border: '#ff8c00', color: '#ffaa40' },
    CURSOR: { bg: 'rgba(255, 100, 180, 0.15)', border: '#ff64b4', color: '#ff90cc' },
    RECOVER: { bg: 'rgba(100, 255, 180, 0.15)', border: '#64ffb4', color: '#90ffcc' },
    NONE: { bg: 'rgba(120, 120, 140, 0.15)', border: '#78788c', color: '#a0a0b8' },
};

export default function TypeBadge({ type }) {
    const colors = TYPE_COLORS[type] || TYPE_COLORS.NONE;
    return (
        <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 7px',
            borderRadius: '4px',
            fontSize: '10px',
            fontFamily: "'Orbitron', monospace",
            fontWeight: '700',
            letterSpacing: '0.08em',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            color: colors.color,
        }}>
            {type}
        </span>
    );
}