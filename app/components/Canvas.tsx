import React, { useEffect, useRef } from "react";
import {
  ballRadius,
  gravity,
  HEIGHT,
  horizontalFriction,
  obstacleRadius,
  pad,
  unPad,
  verticalFriction,
  WIDTH,
} from "../constant";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let balls: Ball[] = [];
    const obstacles: { x: number; y: number; radius: number }[] = [];
    const sinks: { x: number; y: number; width: number; height: number }[] = [];

    // Generate obstacles
    const rows = 16;
    for (let row = 2; row < rows; row++) {
      const numObstacles = row + 1;
      const y = 0 + row * 35;
      const spacing = 36;
      for (let col = 0; col < numObstacles; col++) {
        const x = WIDTH / 2 - spacing * (row / 2 - col);
        obstacles.push({ x: pad(x), y: pad(y), radius: obstacleRadius });
      }
    }

    // Generate sinks
    const sinkWidth = 36;
    const NUM_SINKS = 15;
    for (let i = 0; i < NUM_SINKS; i++) {
      const x = WIDTH / 2 + (i - NUM_SINKS / 2) * sinkWidth + obstacleRadius;
      const y = HEIGHT - 240;
      sinks.push({ x, y, width: sinkWidth, height: sinkWidth });
    }

    // Ball class inside effect (so it has ctx, obstacles, sinks)
    class Ball {
      x: number;
      y: number;
      radius: number;
      color: string;
      vy: number;
      vx: number;

      constructor(x: number, y: number, radius: number, color: string) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.vy = 0;
        this.vx = 0;
      }

      draw() {
        if(!ctx) return
        ctx.beginPath();
        ctx.arc(unPad(this.x), unPad(this.y), this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
      }

      update() {
        this.vy += gravity;
        this.x += this.vx;
        this.y += this.vy;

        // collision with obstacles
        obstacles.forEach((obstacle) => {
          const dist = Math.hypot(this.x - obstacle.x, this.y - obstacle.y);
          if (dist < pad(this.radius + obstacleRadius)) {
            const angle = Math.atan2(this.y - obstacle.y, this.x - obstacle.x);
            const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            this.vx = Math.cos(angle) * speed * horizontalFriction;
            this.vy = Math.sin(angle) * speed * verticalFriction;

            const overlap = this.radius + obstacle.radius - unPad(dist);
            this.x += pad(Math.cos(angle) * overlap);
            this.y += pad(Math.sin(angle) * overlap);
          }
        });

        // collision with sinks
        sinks.forEach((sink) => {
          if (
            unPad(this.x) > sink.x - sink.width / 2 &&
            unPad(this.x) < sink.x + sink.width / 2 &&
            unPad(this.y) + this.radius > sink.y - sink.height / 2
          ) {
            this.vx = 0;
            this.vy = 0;
          }
        });
      }
    }

    // Create one ball
    balls.push(new Ball(pad(WIDTH / 2 + 23), pad(50), ballRadius, "red"));

    function drawObstacles() {
        if(!ctx) return
        ctx.fillStyle = "black";
        obstacles.forEach((obstacle) => {
            ctx.beginPath();
            ctx.arc(
                unPad(obstacle.x),
                unPad(obstacle.y),
                obstacle.radius,
                0,
                Math.PI * 2
            );
            ctx.fill();
            ctx.closePath();
        });
    }
    
    function drawSinks() {
        if(!ctx) return
      ctx.fillStyle = "orange";
      sinks.forEach((sink) => {
        ctx.fillRect(
          sink.x,
          sink.y - sink.height / 2,
          sink.width - obstacleRadius * 2,
          sink.height
        );
      });
    }

    function draw() {
        if(!ctx) return
      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      drawObstacles();
      drawSinks();
      balls.forEach((ball) => {
        ball.draw();
        ball.update();
      });
    }

    function update() {
      draw();
      requestAnimationFrame(update);
    }

    update();
  }, []);

  return (
    <div className="border border-red-500">
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
};

export default Canvas;
