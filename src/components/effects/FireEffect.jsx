import { useEffect, useRef, useState } from "react";
import styles from './Effect.module.css';

const FireEffect = ({ speed = { x: 5, y: 10 }, life = 10,radius=50,particleCount = 100, children, className, ...props }) => {
    console.log("asdad")
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const { offsetWidth, offsetHeight } = containerRef.current || {};
        setDimensions({ width: offsetWidth, height: offsetHeight });
    }, [children]);
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
    
        const W = dimensions.width || window.innerWidth;  
        const H = dimensions.height || window.innerHeight;
        
        canvas.width = W;
        canvas.height = H;
    
        let particles = [];
        const particle_count = particleCount;
    
        for (let i = 0; i < particle_count; i++) {
            particles.push(new ParticleFlame());
        }
    
        function ParticleFlame() {
            this.speed = { x: (speed.x + Math.random() * 5)*0.2, y: (speed.y + Math.random() * 10)*0.2 };
            const locmin = 0;
            const locmax = W;
            this.location = { x: Math.random() * (locmax - locmin) + locmin, y: H+50 };
            this.radius = Math.random() * (-radius) + radius;
            this.life = life + Math.random() * 10;
            this.remaining_life = this.life;
            this.r = "255";
            this.g = Math.round(Math.random() * (100 - 190) + 100);
            this.b = Math.round(Math.random() * (10 - 30) + 10);
        }
    
        function drawFlames() {
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";
    
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.beginPath();
                p.opacity = Math.round((p.remaining_life / p.life) * 100) / 100;
                const gradient = ctx.createRadialGradient(
                    p.location.x,
                    p.location.y,
                    0,
                    p.location.x,
                    p.location.y,
                    p.radius
                );
                gradient.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.opacity})`);
                gradient.addColorStop(0.5, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.opacity})`);
                gradient.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);
                ctx.fillStyle = gradient;
                ctx.arc(p.location.x, p.location.y, p.radius, Math.PI * 2, false);
                ctx.fill();
    
                p.remaining_life -= 0.1;
                p.radius -= Math.random() * (0.1 - 0.01) + 0.01;
                p.location.x += p.speed.x * 0.1;
                p.location.y += p.speed.y * 0.1;
    
                if (p.remaining_life < 0 || p.radius < 0) {
                    particles[i] = new ParticleFlame();
                }
            }
    
            animationRef.current = requestAnimationFrame(drawFlames);
        }
    
        drawFlames();

        return () => {
            cancelAnimationFrame(animationRef.current);
            ctx.clearRect(0, 0, W, H);
            particles = [];
        };
    }, [dimensions]);
    return (
        <div className={styles.wrapper} ref={containerRef}>
            {children} {/* Сюда можно вставлять любые элементы */}
            <canvas
                ref={canvasRef}
                className={styles.canvas}
            />
        </div>
    );
};

export default FireEffect;
