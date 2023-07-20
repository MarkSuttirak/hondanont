import { ReadOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { Space, Button } from 'antd'

const SidebarAdmin = () => {
  const menuList = [
    {
      title: 'Blog',
      icon: <ReadOutlined />,
      link: '/blog-admin'
    },
    {
      title: 'Blog categories',
      icon: <ReadOutlined />,
      link: '/blog-admin'
    },
  ]

  return (
    <div className="h-full fixed left-0 w-[280px] bg-white border border-r-2 border-[#F8F8F8] z-[9999] top-0 p-10">
      <h1>Honda Admin</h1>
      {menuList.map((menu) => 
        <Link to={menu.link}>
          <Button type="text" style={{width:"100%",textAlign:"left"}}>
            <Space>
              {menu.icon}
              {menu.title}
            </Space>
          </Button>
        </Link>
      )}
    </div>
  )
}

export default SidebarAdmin