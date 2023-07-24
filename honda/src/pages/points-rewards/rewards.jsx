import HeaderMobile from "../../components/header"
import RewardSection from "../../components/reward-section"
import FooterMenu from "../../components/footer-menu"
import React, { useState,useEffect } from "react";
import { faChevronLeft, faClockRotateLeft, faGift } from "@fortawesome/free-solid-svg-icons";

const RewardsPage = () => {
  return (
    <div>      
      <HeaderMobile firstIcon={faChevronLeft} title="แลกของรางวัล" secondBtn={true} secondLink="/my-rewards" secondIcon={faGift} />
      <main>
        <section className="mt-7 py-6 pb-20 myrewards" style={{backgroundColor:"#F8F8F8"}}>
          <RewardSection />
        </section>
      </main>
      <FooterMenu activeMenu={2}/>
    </div>
  )
}

export default RewardsPage