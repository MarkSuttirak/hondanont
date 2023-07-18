import { useFrappeGetDoc } from 'frappe-react-sdk';
import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeftOutlined } from "@ant-design/icons"

export default function BlogView() {
  const { id } = useParams();
  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    fields: ['name', 'blogimage', 'title', 'content']
  })

  return (
    <>
      {data && (
        <div className='py-16 px-40'>
          <div className="flex items-center gap-x-[8px] text-lg">
            <Link to={`/blog-edit/${id}`} className="flex">
              <ArrowLeftOutlined />
            </Link>
            <h1 className='text-xl'>You are viewing: {data.title}</h1>
          </div>

          <div className='mt-10'>
            <h1 className='text-3xl font-bold'>{data.title}</h1>
            <div id="preview" dangerouslySetInnerHTML={{ __html:data.content }} />
          </div>
        </div>
      )}
    </>
  );
}