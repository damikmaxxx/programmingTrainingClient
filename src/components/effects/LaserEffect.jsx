import { useEffect, useRef, useState } from "react";
import styles from './Effect.module.css';

const LaserEffect = ({ speed = { x: 3, y: -5 }, life = 100, width = 3, particleCount = 30, children, className, ...props }) => {
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
        for (let i = 0; i < particleCount; i++) {
            setTimeout(() => particles.push(new Laser()), Math.random() * 2000 + 5);
        }

        function Laser() {
            this.speed = { x: speed.x, y: speed.y};
            this.location = { x: Math.random() * W-400, y: H + 200 };
            this.width = width;
            this.life = life;
            this.remaining_life = this.life;
            this.color = `rgba(173, 216, 230, 0.8)`; // Светло-голубой цвет
            ctx.shadowBlur = 10;
            // ctx.shadowColor = this.color;
        }

        function drawLasers() {
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = "lighter";

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.strokeStyle = p.color;
                ctx.lineWidth = p.width;
                ctx.beginPath();
                ctx.moveTo(p.location.x, p.location.y);
                ctx.lineTo(p.location.x + p.speed.x * 50, p.location.y + p.speed.y * 50);
                ctx.stroke();

                p.location.x += p.speed.x;
                p.location.y += p.speed.y;

                if (p.location.y < 0 || p.remaining_life <= 0) {
                    particles[i] = new Laser();
                }
            }

            animationRef.current = requestAnimationFrame(drawLasers);
        }

        drawLasers();

        return () => {
            cancelAnimationFrame(animationRef.current);
            ctx.clearRect(0, 0, W, H);
            particles = [];
        };
    }, [dimensions]);

    return (
        <div className={styles.wrapper} ref={containerRef}>
            {children}
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default LaserEffect;