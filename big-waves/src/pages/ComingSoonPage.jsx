export default function ComingSoonPage({ title }) {
    return (
        <div style={{ minHeight: '100vh', background: '#020812', color: '#fff' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
                <h1>{title}</h1>
                <p style={{ color: '#888', marginTop: '12px' }}>This page is coming soon.</p>
            </div>
        </div>
    );
}
