import React, { useState } from 'react';
import { Card, Button, Space, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { useFrappeGetDocList, useFrappeGetDoc } from 'frappe-react-sdk'
import HondaNon from '../assets/images/honda-non.png'
import classicCard from '../assets/images/classic-card.png'
import silverCard from '../assets/images/silver-card.png'
import goldCard from '../assets/images/gold-card.png'
import platinumCard from '../assets/images/platinum-card.png'
import FooterMenu from '../components/footer-menu';
import RewardSection from '../components/reward-section';
import { Link, useNavigate } from 'react-router-dom'

const LandingPage = () => {
  document.body.style.backgroundColor = "white";
  const [classic, setClassic] = useState(true);
  const [silver, setSilver] = useState(true);
  const [gold, setGold] = useState(false);
  const [platinum, setPlatinum] = useState(false);

  const navigate = useNavigate();

  function showConfirm(props) {
    navigate("/reward/"+props.rewardid);
  }

  const CardReward = (props) => {
    return (
      <Card onClick={() => showConfirm(props)} className="reward-cards" cover={(<img src={props.image}/>)} bodyStyle={{padding:"10px 17px 18px 17px"}} key={props.name}>
        <h2 className="font-bold text-sm pe-3">{props.name}</h2>
        <h3 className="primary-color font-semibold mt-2 text-sm">
          <FontAwesomeIcon icon={faStar} className="mr-1"/>
          {props.point} คะแนน
        </h3>
      </Card>
    )
  }

  const { data: user } = useFrappeGetDoc('User', 'bonnie@mail.com', {
    fields: ['full_name']
  })

  // const { data: allData, isLoading, error, mutate } = useFrappeGetDocList('Item', {
  //   fields: ['item_code','item_name', 'item_group', 'image', 'points']
  // })

  // const { data: freeProduct } = useFrappeGetDocList('Item', {
  //   fields: ['item_code','item_name', 'item_group', 'image', 'points'],
  //   filters: [['item_group','=','Free Product']]
  // })

  // const { data: cashCoupon } = useFrappeGetDocList('Item', {
  //   fields: ['item_code','item_name', 'item_group', 'image', 'points'],
  //   filters: [['item_group','=','Cash Coupon']]
  // })

  return (
    <>
      <header className="px-6 py-3 flex justify-center fixed w-full bg-white top-0 z-50" style={{borderBottom:"1px solid #0000000D",maxHeight:"71px",height:"71px"}}>
        <h1 className={`font-bold text-lg flex`}>
          <img src={HondaNon} width="94px" style={{margin:"auto"}}/>
        </h1>
      </header>
      <main>
        <div className="columns-2 px-6 py-4">
          <div id='say-hello'>
            <h2 className="secondary-color font-medium text-sm"><span style={{color:"black"}}>👋</span> สวัสดีคุณ,<br/>
              <span id="user-name" className="whitespace-pre mt-1 inline-block text-black font-with-inter" style={{fontSize:"16px"}}>{user && user.full_name}</span>
            </h2>
          </div>
          <h2 className="text-right secondary-color font-medium text-sm">คุณมีคะแนน<br/>
            <span id="points" className="text-xl primary-color font-with-inter font-semibold">
              <FontAwesomeIcon icon={faStar} className="mr-2"/>
              <span className="font-with-inter">100</span> คะแนน
            </span>
          </h2>
        </div>

        <section className="px-6 member-card">
          <Card style={{backgroundImage:`url(${classicCard})`}}>
            <div className='columns-1 flex items-end'>
              <div className="inline-block w-1/2">
                <h1 className="text-white text-3xl font-with-inter font-medium">Classic</h1>
                <p className="text-white text-sm font-with-inter">
                  อีก 80 คะแนนเลื่อนเป็น Silver
                </p>
              </div>

              <div className="inline-block w-1/2 text-right">
                <Link to='/my-rewards'>
                  <Button size="large"
                    className="bg-white px-4"
                    style={{
                    borderRadius: '100px',
                    border: 'none',
                    fontSize: '14px',
                    color: '#F0592A',
                  }}>
                    <Space>
                      <FontAwesomeIcon icon={faGift} />
                      <span>รางวัลของฉัน</span>
                    </Space>
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          <div style={{paddingTop:"18px"}}>
            <Link to="/point-collection">
              <Button className="w-full text-left point-collect-btn">
                <Space className="flex justify-between font-medium">
                  วิธีการเก็บคะแนน
                  <FontAwesomeIcon icon={faChevronRight}/>
                </Space>
              </Button>
            </Link>
          </div>
        </section>
        <section className="mt-7 py-6 pb-20" style={{backgroundColor:"#F8F8F8",borderRadius:"12px 12px 0 0"}}>
          <RewardSection />
        </section>
      </main>

      <FooterMenu activeMenu={1}/>
    </>
  )
}

export default LandingPage