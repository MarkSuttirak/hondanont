import React, { useState,useEffect } from "react";
import { Card, Button, Space, Skeleton } from "antd";
import { faChevronLeft, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import FooterMenu from "../../components/footer-menu";
import HeaderMobile from "../../components/header";
import giftVoucher from '../../assets/images/gift-voucher.png'
import { Link } from "react-router-dom";

const Rewards = () => {
  document.body.style.backgroundColor = "#F8F8F8";

  const CardReward = (props) => {
    return (
      <div className="my-rewards">
        <Card cover={(<img src={giftVoucher} />)} onClick={() => showConfirm(props)}>
          <h2 className="font-bold text-color text-base pr-10">Test</h2>
          <p className="text-xs absolute bottom-[6px] text-[#00000099]">สามารถใช้ได้ถึง 12/07/2023</p>
          <h6 className="text-color text-base pr-1">123456</h6>

          <Link to='/coupon-redemption'>
            <Button type='dashed'>แลกคูปอง</Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title="รางวัลของฉัน" secondBtn={true} secondLink="/history" secondIcon={faClockRotateLeft} />
      <main className="p-6">
        <h2 className="font-bold mb-2">รางวัลของฉัน</h2>
        <CardReward />
        <CardReward />
      </main>
      <FooterMenu activeMenu={2}/>
    </div>
  )
}

export default Rewards