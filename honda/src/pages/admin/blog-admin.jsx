import { Table } from "antd";
import { useFrappeGetDocList } from "frappe-react-sdk";
import React, { useState } from "react";

const BlogAdmin = () => {
  const { data, isLoading, error } = useFrappeGetDocList('Honda Blogs', {
    fields: ['name', 'title', 'content']
  })

  const dataSource = [];

  if (data){
    for (let i = 0; i < data.length; i++){
      dataSource.push(
      {
        key: data[i].name,
        id: data[i].name,
        title: data[i].title,
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created'
    }
  ]

  return (
    <div className="p-16">
      <h1>Blogs</h1>
      {data && (
        <Table 
          dataSource={dataSource} columns={columns}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                (window.location.href = `/blog-edit/${record.id}`)
              },
              onMouseEnter: (event) => {
                this.style.cursor = "pointer";
              }
            }
          }}
        />
      )}
    </div>
  )
}

export default BlogAdmin;