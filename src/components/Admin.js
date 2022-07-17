import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import UserDataTable from './UserDataTable'
import { getFirebaseListUsers, auth, storeUserInfo, rolesEnum } from '../lib/firebase'
import { slugify } from '../common/string.fn';
import { Button } from 'antd';

function Admin() {
    const [defaultData, setDefaultData] = useState([])
    const [data, setData] = useState([])
    const [searchKw, setSearchKw] = useState('')
    const [listenEvent, setListenEvent] = useState(null)
    const navigate = useNavigate()
    const logout = () => {
        const action = async () => {
            await auth.signOut();
        }
        action()
    };

    useEffect(() => {

        auth.onAuthStateChanged(async (user) => {
            let newUser = null;
            if (!user) {
                navigate('/')
            }
            if (user) {
                newUser = await storeUserInfo(user);
                if (newUser.role === !rolesEnum.ADMIN) {
                    navigate('/')
                }
                const getData = async () => {
                    const dataUser = await getFirebaseListUsers()
                    const dataAfterHandle = dataUser.filter(e => e.email !== newUser.email).map(e => {
                        return { ...e, slug: slugify(e.name) }
                    })
                    setDefaultData(dataAfterHandle)
                }
                getData()
            }
        });
    }, [listenEvent])

    useEffect(() => {
        setData(defaultData)
    }, [defaultData])

    useEffect(() => {
        const dataAfterSearch = defaultData.filter(e => e.slug.includes(slugify(searchKw)))
        setData(dataAfterSearch)
    }, [searchKw])

    return (
        <div className='app-admin'>
            <div className='logout-1st'>
                <Button onClick={logout}>Log out</Button>
            </div>
            <h1 style={{ textAlign: 'center' }}>ユーザーの情報を管理者画面</h1>
            <div className="search">
                <input
                    value={searchKw}
                    onChange={event => setSearchKw(event.target.value)}
                    placeholder='ユーザーの名前を書いけください'
                    type="text" />

            </div>
            <UserDataTable data={data} setListenEvent={setListenEvent} />
        </div>
    )
}

export default Admin