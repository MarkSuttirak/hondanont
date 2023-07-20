import React, { useState } from 'react';
import { Card, Button, Space, Skeleton } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft, faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { useFrappeGetDocList, useFrappeGetDoc } from 'frappe-react-sdk'
import { Link, useNavigate } from 'react-router-dom'

const RewardSection = () => {
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

  const { data: allData, isLoading, error, mutate } = useFrappeGetDocList('Item', {
    fields: ['item_code','item_name', 'item_group', 'image', 'points']
  })
    
  const { data: freeProduct } = useFrappeGetDocList('Item', {
    fields: ['item_code','item_name', 'item_group', 'image', 'points'],
    filters: [['item_group','=','Free Product']]
  })
    
  const { data: cashCoupon } = useFrappeGetDocList('Item', {
    fields: ['item_code','item_name', 'item_group', 'image', 'points'],
    filters: [['item_group','=','Cash Coupon']]
  })

  return (
    <>
        {allData && (
          <>
            <h2 className="font-bold mb-2 px-6">ของรางวัลทั้งหมด ({allData.length})</h2>
            {isLoading ? (
              <h1>Test</h1>
            ) : (
              <div className="overflow-scroll flex gap-x-4 flex-nowrap px-6">
                {allData.map((item)=>
                  <CardReward image={item.image} name={item.item_name} point={item.points} id={item.item_name} rewardid={item.item_code}/>
                )}
              </div>
            )}
          </>
        )}

        {freeProduct && (
          <div className='mt-4'>
            <h2 className="font-bold mb-2 px-6">ของรางวัล ({freeProduct.length})</h2>
            {isLoading ? (
              <h1>Test</h1>
            ) : (
              <div className="overflow-scroll flex gap-x-4 flex-nowrap px-6">
                {freeProduct.map((item)=>
                  <CardReward image={item.image} name={item.item_name} point={item.points} id={item.item_name} rewardid={item.item_code}/>
                )}
              </div>
            )}
          </div>
        )}

        {cashCoupon && (
          <div className='mt-4'>
            <h2 className="font-bold mb-2 px-6">คูปองแทนเงินสด ({cashCoupon.length})</h2>
            {isLoading ? (
              <h1>Test</h1>
            ) : (
              <div className="overflow-scroll flex gap-x-4 flex-nowrap px-6">
                {cashCoupon.map((item)=>
                  <CardReward image={item.image} name={item.item_name} point={item.points} id={item.item_name} rewardid={item.item_code}/>
                )}
              </div>
            )}
          </div>
        )}
    </>
  )
}

export default RewardSection