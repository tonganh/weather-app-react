import React from 'react'
import UserDataTable from './UserDataTable'

function Admin() {
    return (
        <div className='app-admin'>
            <h1 style={{ textAlign: 'center' }}>ユーザーの情報を管理者画面</h1>
            <div className="search">
                <input
                    // value={location}
                    // onChange={event => setLocation(event.target.value)}
                    // onKeyPress={searchLocation}
                    placeholder='ユーザーの名前を書いけください'
                    type="text" />
                {/* <div className='logout-1st'>
                    <button className='logout-btn' onClick={logout}>Log out</button>
                </div> */}
            </div>
            <UserDataTable />
        </div>
    )
}

export default Admin