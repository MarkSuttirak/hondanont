import { Button, Form, Input, Space, notification, Spin } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeDeleteDoc, useFrappeCreateDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined } from "@ant-design/icons"
import { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';
import SidebarAdmin from "../../components/sidebar-admin";

const BlogAdd = () => {
  const { TextArea } = Input;

  const [api, contextHolder] = notification.useNotification();
  const [saving, setSaving] = useState(false);
  const [loadings, setLoadings] = useState([]);

  const editorRef = useRef(null);

  const log = () => {
    if (editorRef.current) {
      document.getElementById("content").value = editorRef.current.getContent();
      console.log(editorRef.current.getContent());
    }
  };

  const enterLoading = (index) => {
    setSaving(true);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
  };

  const stopLoading = (index) => {
    setSaving(false);
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = false;
      return newLoadings;
    });
  };

  const openNotificationUpdateSuccess = () => {
    api.success({
      message: 'Post updated',
      description:
        'The post has been updated.',
    });
  };

  const openNotificationUpdateError = () => {
    api.error({
      message: 'There is an error',
      description:
        'Sorry, there is an error while updating the post.',
    });
  };

  const { createDoc } = useFrappeCreateDoc();

  const addPost = async (info) => {
    if (editorRef.current) {
      await createDoc('Honda Blogs', {
        title: info.title,
        content: editorRef.current.getContent()
      }).then(() => {
        stopLoading(0);
        openNotificationUpdateSuccess();
      }).catch(() => {
        stopLoading(0);
        openNotificationUpdateError();
      })
    }
  }

  return (
    <>
      <div className='py-16 px-40'>
        {/* <SidebarAdmin /> */}
        <Form onFinish={addPost}>
          <div className="flex justify-between">
            <div className="flex items-center gap-x-[8px] text-2xl">
              <Link to="/blog-admin" className="flex">
                <ArrowLeftOutlined />
              </Link>
              <h1 className="text-4xl font-bold">Add post</h1>
            </div>
            <div className="float-right">
              <Space>
                <Button htmlType="submit" onClick={() => enterLoading(0)}>Save</Button>
              </Space>
            </div>
          </div>
          <div className="block mt-10">
            <Spin spinning={saving} tip='Saving...'>
              <Form.Item name="title">
                <Input type="text" placeholder="Your title" bordered={false} className="p-0 text-3xl font-bold h-[60px]" autoComplete="off"/>
              </Form.Item>
              <Form.Item name="content">
                <Editor
                  onInit={(evt, editor) => editorRef.current = editor}
                  onKeyDown={log}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Sukhumvit Set,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <TextArea style={{resize:'none',display:'none'}} id="content" placeholder="Your content..." className="p-0 text-lg" autoSize bordered={false}/>
              </Form.Item>
            </Spin>
          </div>
        </Form>
      </div>
    </>
  )
}

export default BlogAdd