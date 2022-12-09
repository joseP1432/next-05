import useSWR from 'swr'
import { useState } from 'react'

import { Button, Space } from 'antd';
import { DownOutlined, UpOutlined, SearchOutlined, SortDescendingOutlined, SortAscendingOutlined, FileSearchOutlined } from '@ant-design/icons';
import React from 'react';
import Head from 'next/head'
import { Layout, Menu } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

let onClickSort;
let order = 'ASC';

export default function Movies3() {
    const [state, setState] = useState({ url: '', titleSearchString: '', orderBy: { index: '', order: 'ASC' } });
    const [validate, setValidate] = useState({ message: '' });
    const { data, error } = useSWR(state.url, async (u) => {
        if (!state.url || !state.titleSearchString) return { Search: '' }
        if (state.url === '' || state.titleSearchString === '') return { Search: '' }
        const res = await fetch(`${state.url}/?apiKey=fe65a93e&s=${state.titleSearchString}`)
        const json = await res.json();
        return json;
    })

    if (state.orderBy && state.orderBy.index !== '') {
        if (data) {
            data.Search.sort((a, b) => {
                if (state.orderBy.order === 'ASC') {
                    return (a[state.orderBy.index] > b[state.orderBy.index]) ? 1 : -1;
                } else {
                    return (b[state.orderBy.index] > a[state.orderBy.index]) ? 1 : -1;
                }
            });
        }
    }

    onClickSort = (dataIndex) => {
        setState({
            url: 'https://www.omdbapi.com',
            titleSearchString: state.titleSearchString,
            orderBy: { index: dataIndex, order: state.orderBy.order === 'ASC' ? 'DESC' : 'ASC' }
        });

        order = state.orderBy.order === 'ASC' ? 'DESC' : 'ASC';
    }

    const onClickHandler = e => {
        e.preventDefault()
        let s = document.getElementById('titleSearchString').value
        if (s === '') {
            setValidate({ message: 'Título vazio!' });
        } else {
            if (state.url === '') {
                setState({ url: 'http://www.omdbapi.com', titleSearchString: s, orderBy: state.orderBy });
            } else {
                setState({ url: '', titleSearchString: state.titleSearchString, orderBy: state.orderBy });
            }
            setValidate({ message: '' });
        }
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
                                icon: <Pesquisa1/>,
                                label: '',
                            },
                            {
                                key: '3',
                                icon: <Pesquisa2/>,
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
                            <TheForm message={validate.message} />
                            <TheLink url={state.url} handler={onClickHandler} />
                            <TheMovies data={data ? data : { Search: '' }} show={state.url !== ''} />
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
        </div >
    )
}

export function TheForm({ message }) {
    return (
        <div>
            <form>
                <Space>
                    <label htmlFor="titleSearchString">Filtro de Título</label>
                    <input id="titleSearchString" name="titleSearchString" type="text" autoComplete="true" />
                </Space>
                <p style={{ color: 'red' }}>{message}</p>
            </form>
        </div>
    )
}

export function TheMovies({ data, show }) {
    if (!show) return (<div></div>)
    if (!data) return (<div></div>)
    if (data.error) return (<div>Falha na pesquisa</div>)
    if (data.Error) return (<div>Filme não encontrado na pesquisa</div>)
    if (data.Search === '') return (<div> <Button type="primary" size="small" loading> Carregando...</Button></div>)
    return (
        <div className="table-responsive" style={{ marginLeft: '1rem' }}>
            <table className="table table-striped table-hover">
                <thead className='table-primary'>
                    <tr align='center'>
                        <th scope="col"><>FIlme <SortIcon dataIndex="Title" /></></th>
                        <th scope="col"><>Ano <SortIcon dataIndex="Year" type="number" /></></th>
                        <th scope="col"><>Tipo <SortIcon dataIndex="Type" /></></th>
                    </tr>
                </thead>
                <tbody>
                    {data.Search.map((m) => <tr key={m.imdbID}>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}><img src={m.Poster} width="30%" /></a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}>{m.Year}</a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}>{m.Type}</a></td>
                    </tr>)}
                </tbody>
            </table>
        </div >
    )
}

export function TheLink({ url, handler }) {
    return (
        <div>
            <Button type="primary" ghost href="/movies33.js" onClick={handler}> {url === '' ? <DownOutlined /> : <UpOutlined />} </Button>
            <br /><br />
        </div>
    )
}

export function SortIcon({ dataIndex, type = "letter" }) {
    return (
        <Button onClick={() => onClickSort(dataIndex)} ghost="true" type="white" shape="circle" icon={<SortAscendingOutlined color='#1890ff' icon={type === 'letter' ? (order === 'ASC' ? <SortAscendingOutlined /> : <SortDescendingOutlined />) : (order === 'ASC' ? <SortAscendingOutlined /> : <SortDescendingOutlined />)} />} />
    )
}

export function Pesquisa1() {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button ghost href="movies34"> <FileSearchOutlined /> </Button>
            </Space>
        </div>
    )
}

export function Pesquisa2() {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button ghost href="movies35"> <SearchOutlined /> </Button>
            </Space>
        </div>
    )
}