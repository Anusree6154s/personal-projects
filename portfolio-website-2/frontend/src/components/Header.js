import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export default function Header() {
    return (
        <header style={{position:'sticky', top:'0px', zIndex:2}}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" style={{ background: 'white' , boxShadow:'0px 1px 5px 1px #00000026'}}>
                    <Toolbar style={{ display: 'flex', justifyContent: 'center' }}>
                        <Box style={{ width: '80%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" component="div" sx={{
                                background: 'linear-gradient(to right,var(--light-primary), var(--light-accent))',
                                padding: '0px 8px 0px 10px', fontWeight: 'bold', cursor: 'pointer',
                            }}>
                                A.
                            </Typography>
                            <Box style={{ display: 'flex', color: 'var(--light-text)', width: '50%', justifyContent: 'space-between', cursor: 'pointer' }}>
                                <a href='/#top' >Home</a>
                                <a href='/#skills'>Skills</a>
                                <a href='/#projects'>Projects</a>
                                <a href='/#contact'>Contact</a>
                            </Box>
                            <a href="https://drive.google.com/file/d/1yCF-00tsgWcXbntJY-yjH896HMvbsFew/view?usp=drive_link" target='_blank' rel="noreferrer" color="inherit" style={{ background: 'gold', color: 'var(--special-text)', padding: '5px 15px', border: 'none', fontWeight: 'bold', borderRadius:'5px' }}>Resume</a>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>
        </header>
    )
}
