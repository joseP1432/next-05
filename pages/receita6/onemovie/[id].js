import useSWR from 'swr'
import { useRouter } from 'next/router'
import { HomeOutlined, SearchOutlined, FileSearchOutlined} from '@ant-design/icons';
import { Button, Space, Layout, Menu } from 'antd';
import 'antd/dist/reset.css';
import React from 'react';
import Head from 'next/head'
const { Header, Content, Footer, Sider } = Layout;

export default function Movies3() {
    //const router = useRouter();
    const { id } = useRouter().query;
    const { data, error } = useSWR(`https://www.omdbapi.com/?apikey=fe65a93e&i=` + id, fetcher);
    if (error) return <div>Falha na requisição...</div>
    if (!data) return <div>carregando...</div>

    return (
        <div>
            <Head>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/149/149286.png" type="image/x-icon"></link>
                <title> My Page </title>
            </Head>
            <Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                        console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                        console.log(collapsed, type);
                    }}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={[
                            {
                                key: '1',
                                icon: <br />,
                                label: '',
                            },
                            {
                                key: '2',
                                icon: <Home />,
                                label: '',
                            },
                            {
                                key: '3',
                                icon: <Pesquisa1 />,
                                label: '',
                            },
                            {
                                key: '4',
                                icon: <Pesquisa2 />,
                                label: '',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{
                            padding: 0,
                        }}
                    />
                    <Content
                        style={{
                            margin: '50px 40px 0',
                        }}
                    >
                        <div
                            className="site-layout-background"
                            style={{
                                padding: 0,
                                minHeight: 480,
                            }}
                        >
                            <div style= {{textAlign: 'center'}}>
                                <img src={data.Poster}></img> <br /> <br />
                                <h1> {data.Title} </h1> <h2> {data.Year} </h2>
                            </div>
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        </div>
    )
}

async function fetcher(url) {
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export function Home() {
    return (
        <div>
            <Space>
                <Button ghost href="../movies33"> <HomeOutlined /> </Button>
            </Space>
        </div>
    )
}

export function Pesquisa1() {
    return (
        <div>
            <Space>
                <Button ghost href="../movies34"> <SearchOutlined /> </Button>
            </Space>
        </div>
    )
}

export function Pesquisa2() {
    return (
        <div>
            <Space>
                <Button ghost href="../movies35"> <FileSearchOutlined /> </Button>
            </Space>
        </div>
    )
}