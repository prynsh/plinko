import React, { useEffect, useRef } from 'react'
import Ball from './Ball';
import { ballRadius, gravity, HEIGHT, horizontalFriction, obstacleRadius, pad, unPad, verticalFriction, WIDTH } from '../constant';

const Canvas = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);
     const canvas = canvasRef.current
     const ctx = canvas?.getContext('2d')
        let balls=[]
      const obstacles: { x: number; y: number; radius: number; }[] = []
      const sinks: { x: number; y: number; width: number; height: number; }[] = []


      const rows = 16 //currently it is 16 we need to do it in a way that we take it from the dropdown
        for (let row =2;row<rows;row++){
            const numObstacles = row+1
            const y=0+row *35
            const spacing = 36
            for (let col = 0;col<numObstacles;col++){
                const x = WIDTH/2 - spacing*(row /2 - col)
                obstacles.push({x:pad(x),y:pad(y), radius:obstacleRadius})
            }
        }

        const sinkWidth = 36
        const NUM_SINKS=15
        for (let i=0;i<NUM_SINKS;i++){
            const x = WIDTH /2 +(i -15/2)*(sinkWidth)+obstacleRadius;
            const y = HEIGHT - 240
            const width = sinkWidth
            const height = width
            sinks.push({x,y,width,height})

        }

    class Ball{
        x: number;
        y: number;
        radius: number;
        color: string;
        vy!: number;
        vx!:number
        constructor (x:number,y:number,radius:number,color:string){
            this.x= x;
            this.y= y;
            this.radius= radius;
            this.color= color;

        }
        
        draw(){
            if(!ctx) return;
            ctx.beginPath()
            ctx.arc(unPad(this.x),unPad(this.y),this.radius,0,Math.PI*2)
            ctx.fillStyle=this.color
            ctx.fill()
            ctx.closePath()
        }
        update(){
            this.vy  += gravity
            this.x += this.vx
            this.y+=this.vy
        

            //collisions with obstacles 
            obstacles.forEach(obstacle=>{
                const dist = Math.hypot(this.x = obstacle.x, this.y - obstacle.y)
                if(dist<pad(this.radius+obstacleRadius)){
                    //calculating angles
                    const angle = Math.atan2(this.y- obstacle.y, this.x- obstacle.x)
                    //reflect velocity
                    const speed = Math.sqrt(this.vx*this.vx+this.vy*this.vy)
                    this.vx = (Math.cos(angle)*speed*horizontalFriction)
                    this.vy = (Math.sin(angle)*speed*verticalFriction)

                    //Adjust position to prevent sticking
                    const overlap = this.radius + obstacle.radius - unPad(dist)
                    this.x += pad(Math.cos(angle)*overlap)
                    this.y += pad(Math.sin(angle)*overlap)
                }
            });

            //Collision sinks
            sinks.forEach(sink=>{
                if(
                    unPad(this.x) > sink.x- sink.width/2 && unPad(this.y) < sink.y - sink.width/2 && unPad(this.y) + this.radius > sink.y - sink.height/2
                ){
                    this.vx=0;
                    this.vy=0;
                }
            })
        
        }
    }

    

    useEffect(()=>{
        const canvas = canvasRef.current
         if (!canvas) return;

        const ctx = canvas.getContext("2d")

    },[])


 return<>
 <div className='border border-red-500'>

 <canvas ref={canvasRef} width={800} height={800} />;
    <Ball/>
 </div>
 </> 
}

export default Canvas




