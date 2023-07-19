import { useFrappeGetDoc } from "frappe-react-sdk"
import { useParams } from "react-router-dom"
import HeaderMobile from "../components/header"
import React, { useState,useEffect } from "react";
import { Card, Button, Space, Skeleton } from "antd";
import { faChevronLeft, faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";

const Blog = () => {
  document.body.style.backgroundColor = "white";
  const { id } = useParams()

  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    fields: ['name', 'blogimage', 'title', 'content', 'category']
  })
  return (
    <div>
      <HeaderMobile firstIcon={faChevronLeft} title={data && data.title} secondBtn={false} />
      {data && (
        <main>
          {data.blogimage != null ? (
            <img src={data.blogimage} width="100%" style={{height:"280px"}}/>
          ) : (
            <Skeleton.Image style={{width:"100vw",height:"280px",borderRadius:"0"}}/>
          )}
          <section className="p-6 brand-info">
            <div className="flex items-center justify-between mb-6">
              <div className="block">
                <h5 className="text-xs">{data.category}</h5>
                <h2 className="font-bold text-xl">{data.title}</h2>
              </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html:data.content }}/>
          </section>
        </main>
      )}
    </div>
  )
}

export default Blog