import React, { useEffect, useRef } from 'react'
import Ball from './Ball';
import { ballRadius, HEIGHT, obstacleRadius, pad, WIDTH } from '../constant';

const Canvas = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);

     let balls=[]
      const obstacles = []
      const sinks = []


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




