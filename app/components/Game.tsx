import React, { useEffect, useRef } from 'react'

const Game = () => {
     const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(()=>{
        const canvas = canvasRef.current
         if (!canvas) return;

        const ctx = canvas.getContext("2d")
        if(!ctx) return
        ctx.arc

    },[])


 return<>
 <div className='border border-red-500'>

 <canvas ref={canvasRef} width={800} height={800} />;
 </div>
 </> 
}

export default Game