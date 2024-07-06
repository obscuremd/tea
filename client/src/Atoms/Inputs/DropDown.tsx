import {  AnimatePresence, motion } from "framer-motion";
import { NavArrowDown } from "iconoir-react";
import React, { useState } from 'react';
import { Shared } from "../../assets/Shared";

interface Props {
  dropdown: boolean;
  setDropdown: (value: boolean) => void;
  data: string[];
  setData: (value: string) => void;
  number?: boolean;
  truncate?: string;
  dataStyle?: string;
  icon:React.ReactNode;
  zIndex?: string;
  placeholder?: string;
}

export const Dropdown: React.FC<Props> = ({ dropdown, setDropdown, data, icon, truncate, zIndex, setData, placeholder }) => {
  
  truncate
  const projects = data;
  const [inputValue, setInputValue] = useState('');
  setData(inputValue)
  return (
    
      <motion.button
        onClick={() => setDropdown(!dropdown)}
        className={`px-3 py-2 w-full rounded-2xl border-[1px] border-[#62668980] flex items-center justify-between relative z-${zIndex}`}
        style={{ fontSize: Shared.Text.small}}
        >
            <div className='box p-1 rounded-full'>
                {icon}
            </div>
            <input placeholder={placeholder} type="text" onClick={()=>setDropdown(!dropdown)} className="w-full border-transparent flex items-center justify-center text-center" value={inputValue} onChange={(e)=>setInputValue(e.target.value)}/>
        <NavArrowDown className="text-[#62668980]" />
        {/* options */}
        <AnimatePresence>
          {dropdown && (
            <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            className={`box absolute top-[120%] py-3 px-3 rounded-2xl flex flex-col gap-2 backdrop-blur-lg w-full z-50 max-h-[30vh] overflow-y-scroll`}
            >
            {projects
              .filter(project => project.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item, index) => (
              <button
              onClick={() => setInputValue(item)}
              className="py-1 px-4 border-[1px] border-[#62668988] rounded-xl w-full truncate min-h-8"
              key={index}
              >
              {item}
              </button>
          ))}
          </motion.div>
        )}
        </AnimatePresence>
      </motion.button>
  );
};


