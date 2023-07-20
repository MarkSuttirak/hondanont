import { Button, Table, Image } from "antd";
import { useFrappeGetDocList } from "frappe-react-sdk";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarAdmin from "../../components/sidebar-admin";

const BlogAdmin = () => {
  const { data, isLoading, error } = useFrappeGetDocList('Honda Blogs', {
    fields: ['name', 'blogimage', 'title', 'content', 'category']
  })

  const dataSource = [];

  if (data){
    for (let i = 0; i < data.length; i++){
      dataSource.push(
      {
        key: data[i].name,
        id: data[i].name,
        image: data[i].blogimage,
        title: data[i].title,
        category: data[i].category,
        created: '30 min',
      })
    }
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (img) => <Image src={img} width={50}/>
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Modified',
      dataIndex: 'modified',
      key: 'modified'
    }
  ]

  return (
    <div className='py-16 px-40'>
      <SidebarAdmin />
      <div className="flex justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold">Blogs</h1>
        </div>
        <Link to="/blog-add">
          <Button>Add</Button>
        </Link>
      </div>
      {data && (
        <Table 
          dataSource={dataSource} columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                (window.location.href = `/blog-edit/${record.id}`)
              },
            }
          }}
        />
      )}
    </div>
  )
}

export default BlogAdmin;