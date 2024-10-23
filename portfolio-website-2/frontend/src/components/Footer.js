import React from 'react'

export default function Footer() {
    return (
        <footer style={{ padding: '20px', backgroundColor: '#f8f9fa', textAlign: 'center', display: 'flex', justifyContent: 'center', fontFamily: 'monospace', color:'darkslategray' }}>
            <div style={{ width: '60%', display: 'flex', justifyContent: 'space-around' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px', textAlign: 'left' }}>
                    <span>
                        <strong>Email: </strong>
                        <a href="mailto:anilkumaranusree113@gmail.com">anilkumaranusree113@gmail.com</a>
                    </span>
                    <span>
                        <strong>Phone: </strong>
                        <a href='https://wa.me/+919699973230' target="_blank" rel="noopener noreferrer">+91-9699973230</a>
                    </span>
                    <div>
                        <a href="https://github.com/Anusree6154s" target="_blank" rel="noopener noreferrer" style={{color:'var(--light-primary)', fontWeight:'bold'}}>GitHub</a> |
                        <a href="https://www.linkedin.com/in/anusree-anilkumar-6154s/" target="_blank" rel="noopener noreferrer" style={{color:'var(--light-primary)', fontWeight:'bold'}}> LinkedIn</a>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <span>&copy; 2024 Anusree. All Rights Reserved.</span>
                    <span>Illustrations by <a href="https://storyset.com/education" target="_blank" rel="noopener noreferrer" style={{textDecoration:'underline'}}>Storyset</a></span>
                    <span>Made with ❤️</span>
                </div>

            </div>


        </footer>
    )
}
