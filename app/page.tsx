'use client'
import Image from "next/image";
import InputBox from "./components/InputBox";
import { useState } from "react";
import {Dropdown} from "./components/DropDown";
import Game from "./components/Game";

export default function Home() {
  const [amount,setAmount]= useState("")
  const [selectRisk,setSelectRisk]= useState("")
  const [selectRow,setSelectRow]= useState("")
  return (
    <>
    <div className="min-h-screen p-5 ">
      <div className="flex justify-center gap-5 items-center">
      <div>

      <InputBox onChange={(e)=>{
        setAmount(e.target.value)
      }} label="Bet" placeholder="100" value={amount}></InputBox>
      <div className="flex flex-col">

      <Dropdown label="Risk"
      options={[
        {"label":"Low",value:"Low"},
        {"label":"Medium",value:"Medium"},
        {"label":"High",value:"High"},
      ]}
      selected={selectRisk}
      onSelect={setSelectRisk}
      />
      <Dropdown label="Rows"
      options={[
        {"label":"16",value:"16"},
        {"label":"18",value:"18"},
      ]}
      selected={selectRow}
      onSelect={setSelectRow}
      />
      </div>
      </div>
      <div>
        <Game/>
      </div>
      </div>
    </div>

    </>
  );
}
