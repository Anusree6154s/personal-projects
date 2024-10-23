import React from 'react'
import Landing from '../components/Landing'
import Contact from '../components/Contact'
import Projects from '../components/Projects'
import Skills from '../components/Skills'

export default function Home() {
    return (
        <>
            <Landing />
            <Skills />
            <Projects />
            <Contact />
        </>
    )
}
