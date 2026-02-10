'use server';

import React from 'react';

export function WelcomeEmail({ username }: { username: string }) {
    return (
        <div style={{ fontFamily: 'sans-serif', padding: '40px', backgroundColor: '#f7f3eb' }}>
            <div style={{ border: '4px solid black', padding: '32px', backgroundColor: 'white', boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)' }}>
                <h1 style={{ fontSize: '32px', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', marginBottom: '24px' }}>
                    Welcome to the Club, {username}!
                </h1>
                <p style={{ fontSize: '18px', fontWeight: '700', lineHeight: '1.5', marginBottom: '24px' }}>
                    Your verified analytics are ready to be unlocked. We're excited to have you as part of the ImpreX AI community.
                </p>
                <div style={{ display: 'inline-block', padding: '16px 32px', border: '4px solid black', backgroundColor: '#fde047', fontWeight: '900', textTransform: 'uppercase', fontStyle: 'italic', textDecoration: 'none', color: 'black' }}>
                    Explore Your Report
                </div>
            </div>
        </div>
    );
}
