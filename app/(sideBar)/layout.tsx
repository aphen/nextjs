"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import style from './style.module.css';

const { Header, Sider, Content } = Layout;

const SiderBar: React.FC = (props: any) => {
    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const logout = () => {
        console.log(props)
        localStorage.removeItem('token');
        router.push('/login');
    };

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className={style['demo-logo-vertical']} />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <UserOutlined />,
                            label: '视频列表',
                        },
                        {
                            key: '2',
                            icon: <VideoCameraOutlined />,
                            label: 'nav 2',
                        },
                        {
                            key: '3',
                            icon: <UploadOutlined />,
                            label: 'nav 3',
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Layout className="site-layout">
                    <Header style={{ padding: 0, background: colorBgContainer }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                            }}
                        />
                        <Button className="logout" onClick={logout} style={{float: 'right', margin: '10px'}}>
                            退出
                        </Button>
                    </Header>

                    <Content
                        className="site-layout-background"
                        id="subContainer"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280
                        }}
                    >
                        {props.children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}
export default SiderBar;


// import React from 'react';
// // import { withRouter } from 'react-router-dom';
// import { Layout, Menu, Button } from 'antd';
// // import { Switch, Route, Link } from 'react-router-dom';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import {
//     MenuUnfoldOutlined,
//     MenuFoldOutlined,
//     UserOutlined,
//     SettingOutlined
//     //VideoCameraOutlined,
//     //UploadOutlined,
// } from '@ant-design/icons';
// import { useState } from 'react';

// const { Header, Sider, Content } = Layout;
// const { SubMenu } = Menu;
// console.log('sidebar')
// const SiderBar: React.FC = (props: any) => {
//     const router = useRouter();
//     const [collapsed, setCollapsed] = useState(false);

//     const toggle = () => {
//         setCollapsed(true);
//     };
//     const logout = () => {
//         console.log(props)
//         localStorage.removeItem('token');
//         router.push('/login');
//     };
//         return (
//             <Layout>
//                 <Sider trigger={null} collapsible collapsed={collapsed}>
//                     <div className="logo" />
//                     <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
//                         <Menu.Item key="1" icon={<UserOutlined />}>
//                             <Link href="/video/videoList">视频列表</Link>
//                         </Menu.Item>
//                         <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
//                             <Menu.Item key="9">
//                                 <Link href="/vueapp">Option 9</Link>
//                             </Menu.Item>
//                             <Menu.Item key="91">
//                                 <Link href="/vueapp/about">Option 91</Link>
//                             </Menu.Item>
//                             <Menu.Item key="10">
//                                 <Link href="/reactapp">Option 10</Link>
//                             </Menu.Item>
//                             <Menu.Item key="11">Option 11</Menu.Item>
//                             <Menu.Item key="12">Option 12</Menu.Item>
//                         </SubMenu>
//                     </Menu>
//                 </Sider>
//                 <Layout className="site-layout">
//                     <Header className="site-layout-background" style={{ padding: 0 }}>
//                         {React.createElement(
//                             collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
//                             {
//                                 className: 'trigger',
//                                 onClick: toggle
//                             }
//                         )}
//                         <Button className="logout" onClick={logout}>
//                             退出
//                         </Button>
//                     </Header>

//                     <Content
//                         className="site-layout-background"
//                         id="subContainer"
//                         style={{
//                             margin: '24px 16px',
//                             padding: 24,
//                             minHeight: 280
//                         }}
//                     >
//                         { props.children}
//                         {/* <Switch>
//                             <Route path="/videoList" component={videoList} strict exact />
//                             <Route path="/dashboard/analysis"></Route>
//                             <Route path="/" component={videoList} />
//                         </Switch> */}
//                     </Content>
//                 </Layout>
//             </Layout>
//         );
//     }

// //ReactDOM.render(<SiderDemo />, mountNode);

// // export default withRouter(SiderBar);
// export default SiderBar;
