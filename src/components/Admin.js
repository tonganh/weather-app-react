import React, { useEffect, useState } from 'react';
import UserDataTable from './UserDataTable'
import { getFirebaseListUsers } from '../lib/firebase'
import { slugify } from '../common/string.fn';

function Admin() {
    const [defaultData, setDefaultData] = useState([])
    const [data, setData] = useState([])
    const [searchKw, setSearchKw] = useState('')

    useEffect(() => {
        const getData = async () => {
            const dataUser = await getFirebaseListUsers()
            const dataAfterHandle = dataUser.map(e => {
                return { ...e, slug: slugify(e.name) }
            })
            setDefaultData(dataAfterHandle)
        }
        getData()
    }, [])

    useEffect(() => {
        setData(defaultData)
    }, [defaultData])

    useEffect(() => {
        const dataAfterSearch = defaultData.filter(e => e.slug.includes(slugify(searchKw)))
        setData(dataAfterSearch)
    }, [searchKw])

    return (
        <div className='app-admin'>
            <h1 style={{ textAlign: 'center' }}>ユーザーの情報を管理者画面</h1>
            <div className="search">
                <input
                    value={searchKw}
                    onChange={event => setSearchKw(event.target.value)}
                    placeholder='ユーザーの名前を書いけください'
                    type="text" />
                {/* <div className='logout-1st'>
                    <button className='logout-btn' onClick={logout}>Log out</button>
                </div> */}
            </div>
            <UserDataTable data={data} />
        </div>
    )
}

export default Admin