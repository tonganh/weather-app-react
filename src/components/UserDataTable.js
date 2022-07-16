import React from 'react';
import { Space, Table, Tag } from 'antd';
import { rolesEnum } from '../lib/firebase'

const UserDataTable = ({ data }) => {

    const columns = [
        {
            title: '名前',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: '町',
            dataIndex: 'location',
            key: 'location',
            align: 'center'
        },
        {
            title: '役割',
            key: 'role',
            dataIndex: 'role',
            align: 'center',
            render: (_, { role }) => {
                let color = role === rolesEnum.ADMIN ? 'geekblue' : 'green';
                return (
                    <Tag color={color} >
                        {role}
                    </Tag>
                );
            }
        },
        {
            title: '行動',
            key: 'action',
            align: 'center',
            render: (_, record) => (
                <Space size="middle">
                    <a>Invite {record.name}</a>
                    <a>Delete</a>
                </Space>
            ),
        },
    ];

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default UserDataTable;