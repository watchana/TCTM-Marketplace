import React, { useState } from 'react';
import { Button } from '@mui/material'
import User from './user';
import Market from './market';

const Backoffice = () => {
  const [isUserVisible, setUserVisible] = useState(true); // สร้าง state เพื่อเก็บสถานะการแสดง User
  const [isMarketVisible, setMarketVisible] = useState(false); // สร้าง state เพื่อเก็บสถานะการแสดง Market

  const handleUserClick = () => {
    setUserVisible(true); // แสดงคอมโพเนนต์ User
    setMarketVisible(false); // ซ่อนคอมโพเนนต์ Market
  };

  const handleMarketClick = () => {
    setUserVisible(false); // ซ่อนคอมโพเนนต์ User
    setMarketVisible(true); // แสดงคอมโพเนนต์ Market
  };

  return (
    <div>
      {/* แสดงปุ่ม User หาก isUserVisible เป็น true */}
      {isUserVisible && (
        <div>
          <Button onClick={handleMarketClick}>Market</Button>
          <User />
        </div>
      )}

      {/* แสดงปุ่ม Market หาก isMarketVisible เป็น true */}
      {isMarketVisible && (
        <div>
          <Button onClick={handleUserClick}>User</Button>
          <Market />
        </div>
      )}
    </div>
  );
};

export default Backoffice;
