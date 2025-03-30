import { useEffect, useRef } from "react";
import styles from './Effect.module.css';

const SnowEffect = ({ speed = { x: 0, y: 2 }, life = 100, radius = 5, particleCount = 200, children, className }) => {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]); // Сохраняем частицы между рендерами

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        const { offsetWidth, offsetHeight } = containerRef.current;
        const W = offsetWidth;
        const H = offsetHeight;

        canvas.width = W;
        canvas.height = H;

        // Инициализация частиц только если их еще нет
        if (particlesRef.current.length === 0) {
            for (let i = 0; i < particleCount; i++) {
                particlesRef.current.push(new Snowflake(W, H));
            }
        }

        function Snowflake(W, H) {
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

            for (let i = 0; i < particlesRef.current.length; i++) {
                const p = particlesRef.current[i];
                ctx.beginPath();
                ctx.arc(p.location.x, p.location.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                p.location.x += p.speed.x;
                p.location.y += p.speed.y;

                if (p.location.y > H) {
                    particlesRef.current[i] = new Snowflake(W, H);
                }
            }

            animationRef.current = requestAnimationFrame(drawSnowflakes);
        }

        drawSnowflakes();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [speed.x, speed.y, radius, particleCount, life]); // Зависимости эффекта

    return (
        <div className={styles.wrapper} ref={containerRef}>
            {children}
            <canvas ref={canvasRef} className={styles.canvas} />
        </div>
    );
};

export default SnowEffect;