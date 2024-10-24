import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function Landing() {
    return (
        <section id='landing' style={{ display: 'flex', justifyContent: 'center', height: '90vh', alignItems: 'center' , marginBottom:'2%'}}>
            <div style={{ width: '75%', display: 'flex', gap: '10%' }}>

                <div style={{ flex: 1, textAlign: 'left' }}>
                    <div style={{ fontFamily: 'var(--text-primary)', marginBottom: '20px', textTransform: 'uppercase'}}>
                        <h1 style={{ margin: '0px', marginBottom: '5px' }}>
                            <span>Hi I'm  </span>
                            <span style={{
                                background: 'linear-gradient(to right, var(--light-primary), var(--light-accent))',
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                color: 'transparent',
                                margin: '0px', fontWeight: '900'
                            }}>
                                Anusree
                            </span>
                            👋
                        </h1>

                        <h2 style={{ margin: '0px' }}>I'm a <span style={{
                            background: 'linear-gradient(to right, var(--light-primary), var(--light-accent))',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent', fontWeight: '900'
                        }}>Fullstack Developer</span></h2>


                    </div>
                    <div>
                        <p style={{ fontSize: '16px' }}>
                            I specialize in building applications using <strong>ReactJS</strong> and <strong>JavaScript</strong> for the frontend, along with databases like <strong>MongoDB</strong> and <strong>SQL</strong>. Additionally, I work with state management tools such as <strong>Redux</strong>. Currently, I'm expanding my skill set with Next.js and TypeScript.
                        </p>


                        <p style={{ fontSize: '16px' }}> Explore my projects to learn more!</p>

                        <a href='/projects' style={{ background: 'gold', border: 'none', padding: '10px 20px', display: 'flex', alignItems: 'center', color: 'var(--special-text)', fontWeight: 'bold', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', width: 'fit-content' }} onMouseOver={(e) => e.currentTarget.style.background = 'dark-gold'} onMouseOut={(e) => e.currentTarget.style.background = 'gold'}>
                            <span>VIEW ALL PROJECTS</span>
                        </a>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <a href='https://github.com/Anusree6154s' style={{ width: '30px', height: '30px', background: 'black', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = 'var(--light-primary)'} onMouseOut={e => e.currentTarget.style.background = 'black'} >
                                <GitHubIcon style={{ width: '15px', height: '15px', color: 'white' }} />
                            </a>
                            <a href='https://www.linkedin.com/in/anusree-anilkumar-6154s/' style={{ width: '30px', height: '30px', background: 'black', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = 'var(--light-primary)'} onMouseOut={e => e.currentTarget.style.background = 'black'}>
                                <LinkedInIcon style={{ width: '15px', height: '15px', color: 'white' }} />
                            </a>
                            <a href='mailto:anilkumaranusree113@gmail.com' style={{ width: '30px', height: '30px', background: 'black', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = 'var(--light-primary)'} onMouseOut={e => e.currentTarget.style.background = 'black'}>
                                <EmailIcon style={{ width: '15px', height: '15px', color: 'white' }} />
                            </a>
                            <a href='https://wa.me/+919699973230' style={{ width: '30px', height: '30px', background: 'black', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onMouseOver={e => e.currentTarget.style.background = 'var(--light-primary)'} onMouseOut={e => e.currentTarget.style.background = 'black'}>
                                <WhatsAppIcon style={{ width: '15px', height: '15px', color: 'white' }} />
                            </a>




                        </div>
                    </div>
                </div>

                <div style={{ flex: 1 }}>
                    <img src="/images/profile-img-1.png" alt="profile-img" style={{ objectFit: 'fit', width: '85%' }} />
                </div>
            </div>
        </section>
    )
}
