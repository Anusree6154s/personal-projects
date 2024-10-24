import React from 'react'

export default function Skills() {

    const skills = [
        { name: 'HTML', img: '/images/icons/html-icon.png' },
        { name: 'CSS', img: '/images/icons/css-icon.png' },
        { name: 'Javascript', img: '/images/icons/js-icon.png' },
        { name: 'ReactJS', img: '/images/icons/react-icon.png' },
        { name: 'NodeJS', img: '/images/icons/node-icon.png' },
        { name: 'MongoDB', img: '/images/icons/mongo-icon.png' },
        { name: 'ExpressJS', img: '/images/icons/express-icon.png' },
        { name: 'Redux', img: '/images/icons/redux-icon.png' },
        { name: 'SQL', img: '/images/icons/sql-icon.png' },
        { name: 'REST', img: '/images/icons/rest-icon.png' },
        { name: 'HTTP', img: '/images/icons/http-icon.png' },
        { name: 'Git', img: '/images/icons/git-icon.png' },
        { name: 'Mongoose', img: '/images/icons/mongoose-icon.png' },
        { name: 'MUI', img: '/images/icons/mui-icon.png' },
        { name: 'Bootstrap', img: '/images/icons/bootstrap-icon.png' },
        { name: 'Tailwind', img: '/images/icons/tailwind-icon.png' }
    ]
    return (
        <section id='skills' style={{ height: 'fit-content', background: 'var(--default-color-2)', display: 'flex', justifyContent: 'center', padding: '8% 0% '}}>
            <div style={{ width: '80%' }}>
                <h1 style={{ marginBottom: '3%', marginTop: '0px', color: 'var(--light-primary)', fontWeight: '900', textTransform: 'uppercase' }}>
                    Skills
                </h1>
                <div style={{ gap: '2%', flexWrap: 'wrap', display: 'flex', justifyContent: 'center' }}>

                    {skills.map((skill, index) =>
                        <div key={index} style={{ width: '100px', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '2%', flexDirection: 'column', background: 'var(--default-color-1)', borderRadius: '5px' }}>
                            <img src={skill.img} alt={skill.name} style={{ width: '40px', height: '40px' }} />
                            <span style={{ margin: '5px', fontSize: '15px' }}>
                                {skill.name}
                            </span>
                        </div>
                    )}
                </div>
            </div>


        </section>
    )
}
