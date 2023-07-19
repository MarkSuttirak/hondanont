import { Button, Form, Input, Space, Upload, notification, Typography, Spin, message, Modal } from "antd"
import TextArea from "antd/es/input/TextArea";
import { Link, useParams } from "react-router-dom"
import { useFrappeGetDoc, useFrappeUpdateDoc, useFrappeDeleteDoc } from "frappe-react-sdk"
import { ArrowLeftOutlined, UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons"
import { useEffect, useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const BlogEdit = () => {
  const [api, contextHolder] = notification.useNotification();
  const [saving, setSaving] = useState(false);
  const [imgloading, setImgloading] = useState(false);
  const [loadings, setLoadings] = useState([]);
  const [fileList, setFileList] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modified, setModified] = useState(false)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    location.href = '/blog-admin'
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { Paragraph } = Typography;

  const editorRef = useRef(null);

  const log = () => {
    setModified(true);
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

  const openNotificationDeleteSuccess = () => {
    api.success({
      message: 'Post deleted',
      description:
        'The post has been deleted.',
    });
  };

  const openNotificationDeleteError = () => {
    api.error({
      message: 'There is an error',
      description:
        'Sorry, there is an error while deleting the post.',
    });
  };

  const { id } = useParams();
  const { TextArea } = Input;

  const { data } = useFrappeGetDoc('Honda Blogs', id, {
    filter: ['name', 'blogimage', 'title', 'content']
  })

  const { updateDoc } = useFrappeUpdateDoc();
  const { deleteDoc } = useFrappeDeleteDoc();

  const savePost = async (info) => {
    if (editorRef.current) {
      await updateDoc('Honda Blogs', id, {
        title: info.title,
        image: info.image,
        content: editorRef.current.getContent()
      }).then(() => {
        stopLoading(0);
        setModified(false);
        openNotificationUpdateSuccess();
      }).catch(() => {
        stopLoading(0);
        openNotificationUpdateError();
      })
    }
  }

  const deletePost = async (info) => {
    await deleteDoc('Honda Blogs', id, info)
    .then(() => {
      stopLoading(0);
      openNotificationDeleteSuccess();
      location.href = "/blog-admin"
    }).catch(() => {
      stopLoading(0);
      openNotificationDeleteError();
    })
  }

  const uploadButton = (
    <div>
      {imgloading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  return (
    <>
      {data && (
        <div className='py-16 px-40'>
          {contextHolder}
          <Form onFinish={savePost}>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-[8px] text-2xl">
                {modified ? (
                  <ArrowLeftOutlined onClick={showModal}/>
                ) : (
                  <ArrowLeftOutlined onClick={handleOk}/>
                )}
                <h1 className="text-4xl font-bold">Edit post: {data.title}</h1>
              </div>
              <div className="float-right">
                <Space>
                  <Link to={`/blog-view/${id}`}>
                    <Button>View</Button>
                  </Link>
                  <Button htmlType="submit" onClick={() => enterLoading(0)}>Save</Button>
                  <Button type="primary" danger onClick={deletePost}>Delete</Button>
                </Space>
              </div>
            </div>
            {data && (
              <div className="block mt-10">
                <Spin spinning={saving} tip='Saving...'>
                  <Form.Item name="blogimage">
                    <Upload
                      handlePreview={handlePreview}
                      handleChange={handleChange}
                      listType="picture-card"
                      maxCount={1}
                      accept=".JPG,.JPEG,.PNG"
                    >
                      {uploadButton}
                    </Upload>
                  </Form.Item>
                  <Form.Item name="title">
                    <Input type="text" placeholder="Your title" id="title" defaultValue={data.title} bordered={false} className="p-0 text-3xl font-bold h-[60px]" autoComplete="off" onKeyDown={() => setModified(true)}/>
                  </Form.Item>
                  <Form.Item name="content">
                    <Editor
                      initialValue={data.content}
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
                    <TextArea style={{resize:'none',display:'none'}} placeholder="Your content..." id="content" defaultValue={data.content} className="p-0 text-lg" autoSize bordered={false}/>
                  </Form.Item>
                </Spin>
              </div>
            )}
          </Form>
          <Modal title="Your blog is not saved" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okType="default">
            <p>Are you sure to go back to the homepage? Your modified blog will not be saved.</p>
          </Modal>
        </div>
      )}
    </>
  )
}

export default BlogEdit