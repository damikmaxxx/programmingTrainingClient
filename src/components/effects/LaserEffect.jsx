import { useEffect, useRef } from "react";
import styles from './Effect.module.css';

const LaserEffect = ({
  speed = { x: 3, y: -5 },
  life = 100,
  width = 3,
  particleCount = 30,
  length = 200,
  xOffset = -400,
  yOffset = 200,
  children,
  className
}) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]); // Сохраняем частицы между рендерами
  const lengthRef = useRef(length); // Сохраняем длину линии

  // Обновление lengthRef при изменении пропа length
  useEffect(() => {
    lengthRef.current = length;
  }, [length]);

  // Основной эффект для анимации
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
        // Имитация задержки через setTimeout
        setTimeout(() => particlesRef.current.push(new Laser(W, H)), Math.random() * 2000 + 5);
      }
    }

    function Laser(W, H) {
      this.speed = { x: speed.x, y: speed.y };
      this.location = { x: Math.random() * W + xOffset, y: H + yOffset };
      this.width = width;
      this.life = life;
      this.remaining_life = this.life;
      this.color = `rgba(173, 216, 230, 0.8)`; // Светло-голубой цвет
    }

    function drawLasers() {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < particlesRef.current.length; i++) {
        const p = particlesRef.current[i];
        let magnitude = Math.sqrt(p.speed.x * p.speed.x + p.speed.y * p.speed.y);
        let direction_x, direction_y;

        // Обработка нулевого вектора скорости
        if (magnitude === 0) {
          direction_x = 0;
          direction_y = -1; // Направление вниз по умолчанию
        } else {
          direction_x = p.speed.x / magnitude;
          direction_y = p.speed.y / magnitude;
        }

        // Расчёт конечной точки линии с использованием lengthRef
        let end_x = p.location.x + direction_x * lengthRef.current;
        let end_y = p.location.y + direction_y * lengthRef.current;

        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.width;
        ctx.beginPath();
        ctx.moveTo(p.location.x, p.location.y);
        ctx.lineTo(end_x, end_y);
        ctx.stroke();

        // Обновление позиции частицы на основе скорости
        p.location.x += p.speed.x;
        p.location.y += p.speed.y;

        // Пересоздание частицы, если она вышла за пределы или исчерпала жизнь
        if (p.location.y < 0 || p.remaining_life <= 0) {
          particlesRef.current[i] = new Laser(W, H);
        }
      }

      animationRef.current = requestAnimationFrame(drawLasers);
    }

    drawLasers();

    // Очистка при размонтировании
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed.x, speed.y, life, width, particleCount, xOffset, yOffset]); // Зависимости эффекта

  return (
    <div className={styles.wrapper} ref={containerRef}>
      {children}
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default LaserEffect;