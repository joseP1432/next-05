import useSWR from 'swr'
import { useState } from 'react'

import { Button, Space, Layout, Menu} from 'antd';
import { DownOutlined, UpOutlined, HomeOutlined, FileSearchOutlined } from '@ant-design/icons';
import React from 'react';
import Head from 'next/head'
const { Header, Content, Footer, Sider } = Layout;


export default function Movies35() {
    const [state, setState] = useState({ url: '', titleSearchString: '', yearSearchString: '', typeSearchString: '' })
    const [validate, setValidate] = useState({ message: '' });
    const { data, error } = useSWR(state.url, async (u) => {
        if (!state.url && !state.titleSearchString && !state.yearSearchString && !state.typeSearchString) return { Search: '' }
        if (state.url === '' && state.titleSearchString === '' && state.yearSearchString === '' && state.typeSearchString === '') return { Search: '' }
        const res = await fetch(`${state.url}/?apiKey=fe65a93e&s=${state.titleSearchString}&y=${state.yearSearchString}&type=${state.typeSearchString}`)
        const json = await res.json();
        return json;
    })

    const onClickHandler = e => {
        e.preventDefault()
        let s = document.getElementById('titleSearchString').value
        let t = document.getElementById('yearSearchString').value
        let v = document.getElementById('typeSearchString').value
        if (s === '') {
            setValidate({ message: 'Título vazio!'});
        } else {
            if (state.url === '') {
                setState({ url: 'http://www.omdbapi.com', titleSearchString: s, yearSearchString: t, typeSearchString: v })
            }else{
                setState({ url: '', titleSearchString: state.titleSearchString, yearSearchString: state.yearSearchString, typeSearchString: state.yearSearchString })
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
                                icon: <Home />,
                                label: '',
                            },
                            {
                                key: '3',
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

export function TheForm({message}) {
    return (
        <div>
            <form>
                <Space>
                    <label htmlFor="titleSearchString">Filtro de Título</label>
                    <input id="titleSearchString" name="titleSearchString" type="text" autoComplete="true" required /> <br /> <br />
                    <label htmlFor="yearSearchString">Ano de Lançamento</label>
                    <input id="yearSearchString" name="yearSearchString" type="text" autoComplete="true" required /> <br /> <br />
                    <label htmlFor="typeSearchString">Tipo de Obra</label>
                    <input id="typeSearchString" placeholder='"movie", "series", "video"' name="typeSearchString" type="text" autoComplete="true" required />
                </Space>
                <p style={{color: 'red'}}>{ message }</p>
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
                        <th scope="col">Filme</th>
                        <th scope="col">Ano</th>
                        <th scope="col">Tipo</th>
                    </tr>
                </thead>
                <tbody>
                    {data.Search.map((m) => <tr key={m.imdbID}>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}> <img src={m.Poster} width="30%"/> </a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}> {m.Year} </a></td>
                        <td align='center'><a key={m.imdbID} href={"/onemovie/" + m.imdbID}> {m.Type} </a></td>
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
           <br/><br/>
        </div>
    )
}

export function Pesquisa2() {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button ghost href="movies34"> <FileSearchOutlined /> </Button>
            </Space>
        </div>
    )
}

export function Home() {
    return (
        <div style={{ marginLeft: '2rem' }}>
            <Space>
                <Button ghost href="movies33"> <HomeOutlined /> </Button>
            </Space>
        </div>
    )
}