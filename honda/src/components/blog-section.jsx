import React, { useState } from 'react';
import { Card, Image, Skeleton } from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft, faChevronRight, faGift } from "@fortawesome/free-solid-svg-icons";
import { useFrappeGetDocList, useFrappeGetDoc } from 'frappe-react-sdk'
import { Link, useNavigate } from 'react-router-dom'

const BlogSection = () => {
  const { data: blogData, isLoading } = useFrappeGetDocList('Honda Blogs', {
    fields: ['name', 'blogimage', 'title', 'content']
  })

  const CardBlog = (props) => {
    return (
      <Link to={`/blog/${props.id}`} style={{height:"100%"}}>
        <Card className="reward-cards h-full" key={props.name} variant="unstyled">
          <Image src={props.image} alt={props.name}/>
          <div className='p-4'>
            <h2 className="font-bold text-sm pe-3">{props.name}</h2>
            <h3 className="primary-color font-semibold mt-2 text-sm h-[40px] overflow-hidden text-ellipsis" dangerouslySetInnerHTML={{ __html:props.desc }}/>
          </div>
        </Card>
      </Link>
    )
  }
  return (
    <>
      {blogData && (
        <div className='mt-4'>
          <h2 className="font-bold mb-2 px-6">บทความ</h2>
          {isLoading ? (
            <h1>Test</h1>
          ) : (
            <div className="overflow-x-scroll overflow-y-hidden flex gap-x-4 flex-nowrap px-6">
              {blogData.map((item)=>
                <CardBlog image={item.blogimage !== null ? item.blogimage : <Skeleton.Image />} name={item.title} desc={item.content} id={item.name} />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default BlogSection