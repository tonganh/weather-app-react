import React from 'react';
import { Space, Table, Tag, Button } from 'antd';
import { rolesEnum, updateRoleUser } from '../lib/firebase'

const UserDataTable = ({ data, setListenEvent }) => {
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
            render: (_, record) => {
                return (
                    < Space size="middle" >
                        <Button onClick={() => {
                            if (record.role === rolesEnum.ADMIN) {
                                updateRoleUser(record, rolesEnum.USER)
                            }

                            if (record.role === rolesEnum.USER) {
                                updateRoleUser(record, rolesEnum.ADMIN)
                            }
                            setListenEvent(Math.random())

                        }}>
                            Set {record.name} to {record.role === rolesEnum.ADMIN ? rolesEnum.USER : rolesEnum.ADMIN}
                        </Button>
                    </ Space>
                )
            }
        },
    ];

    return (
        <Table columns={columns} dataSource={data} />
    )
}

export default UserDataTable;