import { Link } from 'react-router-dom';

export default function NotFoundPage() {
    return (
        <div style={{ minHeight: '100vh', background: '#020812', color: '#fff' }}>
            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
                <h1>404</h1>
                <p style={{ color: '#888', marginTop: '12px' }}>This page doesn't exist.</p>
                <Link to="/" style={{ display: 'inline-block', marginTop: '24px', color: '#00c8ff' }}>
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
