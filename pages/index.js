import useSWR from 'swr'
import {useState} from 'react'
import { Button, Space } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined } from '@ant-design/icons';
import React from 'react';
import Head from 'next/head'
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;


export default function Movies3() {
    const [url, setUrl] = useState('')
    const { data, error } = useSWR(url, theFetcher)

    const onClickHandler = (e) => {
        e.preventDefault()
        if (url === '') setUrl('https://www.omdbapi.com/?apikey=fe65a93e&s=wonder')
        else setUrl('')
    }

    return (
        <div>
            <Head>
                <link rel="icon" href="https://cdn-icons-png.flaticon.com/512/149/149286.png" type="image/x-icon"></link>
                <title> My Page </title>
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"></link>
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
                                icon: <Pesquisa />,
                                label: '',
                            },
                            {
                                key: '3',
                                icon: <TheLink url={url} handler={onClickHandler} />,
                                label: '',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        className="site-layout-sub-header-background"
                        style={{
                            padding: 10,
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
                            <TheMovies data={error ? { error: 'Erro na pesquisa' } : data ? data : { Search: '' }} show={url !== ''} />
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

async function theFetcher(url) {
    if (url === null || url === '') return { Search: '' }
    const res = await fetch(url);
    const json = await res.json();
    return json;
}

export function TheMovies({ data, show }) {
    if (!show) return (<div></div>)
    if (data.error) return (<div>Falha na requisição</div>)
    if (data.Error) return (<div><h1>Filme não encontrado.</h1></div>)
    if (data.Search === '') return (<div> <Button type="primary" size="small" loading> Carregando...</Button></div>)
    return (
        <div className="table-responsive" style={{ marginLeft: '1rem' }}>
            <table className="table table-striped table-hover">
                <thead className='table-primary'>
                    <tr align='center'>
                        <th scope="col"> Capa </th>
                        <th scope="col"> Titulo </th>
                        <th scope="col"> Ano de Lançamento </th>
                    </tr>
                </thead>
                <tbody>
                    {data.Search.map((m) => <tr>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}><img src={m.Poster} width="40%"/></a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}>{m.Title}</a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}>{m.Year}</a></td></tr>)}
                </tbody>
            </table>
        </div>
    )
}

export function TheLink({ url, handler }) {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button type="primary" ghost href="/movies3.js" onClick={handler}> {url === '' ? <DownOutlined /> : <UpOutlined />} </Button>
            </Space>
        </div>
    )
}

export function Pesquisa() {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button ghost href="movies4"> <SearchOutlined /> </Button>
            </Space>
        </div>
    )
}