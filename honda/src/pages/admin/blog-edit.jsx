import { Button, Form, Input, Space } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined } from "@ant-design/icons"

const BlogEdit = () => {
  const { id } = useParams();
  const { TextArea } = Input;

  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    filter: ['name', 'title', 'content']
  })

  console.log(data);

  const { updateDoc } = useFrappeUpdateDoc();

  const savePost = (info) => {
    updateDoc('Honda Blogs', id, info)
    .then(() => {
      console.log("DONE")
    }).catch(() => {
      console.log("ERROR")
    })
  }
  return (
    <>
      {data && (
        <div className="p-16">
          <Form onFinish={savePost}>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-[8px] text-lg">
                <Link to="/blog-admin" className="flex">
                  <ArrowLeftOutlined />
                </Link>
                <h1 className="text-xl">Edit post: {data.title}</h1>
              </div>
              <div className="float-right">
                <Space>
                  <Button htmlType="submit">Save</Button>
                  <Button type="primary" danger>Delete</Button>
                </Space>
              </div>
            </div>
            {data && (
              <div className="block mt-10">
                <Form.Item name="title">
                  <Input type="text" defaultValue={data.title} bordered={false} className="p-0 text-3xl font-bold" autoComplete="off"/>
                </Form.Item>
                <Form.Item name="content">
                  <TextArea style={{resize:'none'}} defaultValue={data.content} className="p-0 text-lg" autoSize bordered={false}/>
                </Form.Item>
              </div>
            )}
          </Form>
        </div>
      )}
    </>
  )
}

export default BlogEdit