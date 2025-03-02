import { useEffect, useRef, useState } from "react";
import styles from './Effect.module.css';

const SnowEffect = ({ speed = { x: 0, y: 2 }, life = 100, radius = 5, particleCount = 200, children, className, ...props }) => {
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
            particles.push(new Snowflake());
        }

        function Snowflake() {
            this.speed = { x: (Math.random() - 0.5) * speed.x, y: speed.y + Math.random() * 2 };
            this.location = { x: Math.random() * W, y: Math.random() * -H };
            this.radius = Math.random() * radius + 1;
            this.life = life;
            this.remaining_life = this.life;
        }

        function drawSnowflakes() {
            ctx.clearRect(0, 0, W, H);
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "white";

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                ctx.beginPath();
                ctx.arc(p.location.x, p.location.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.location.x += p.speed.x;
                p.location.y += p.speed.y;

                if (p.location.y > H) {
                    particles[i] = new Snowflake();
                }
            }

            animationRef.current = requestAnimationFrame(drawSnowflakes);
        }

        drawSnowflakes();

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

export default SnowEffect;
