
'use client'

import { Card } from './Card'

const cardData = [
    { title: "Robotics 101", url: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", link: "/robotics-101" },
    { title: "AI Integration", url: "https://images.unsplash.com/photo-1555255707-c07966088b7b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", link: "/ai" },
    { title: "Circuit Design", url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", link: "/circuits" },
    { title: "Drone Tech", url: "https://images.unsplash.com/photo-1506947411487-a56738267384?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", link: "/drones" },
    { title: "Automation", url: "https://images.unsplash.com/photo-1535378433864-a624d830b8b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80", link: "/automation" },
]

export const CardRing = () => {
    const radius = 5

    return (
        <group position={[0, 0, 0]}>
            {cardData.map((card, index) => {
                const count = cardData.length
                const angle = (index / count) * Math.PI * 2
                const x = Math.sin(angle) * radius
                const z = Math.cos(angle) * radius

                // Calculate rotation to face center (or slightly offset)
                // atan2(x, z) gives the angle to face the center
                const rotY = angle + Math.PI

                return (
                    <Card
                        key={index}
                        position={[x, 0, z]}
                        rotation={[0, rotY, 0]}
                        url={card.url}
                        title={card.title}
                        link={card.link}
                    />
                )
            })}
        </group>
    )
}
