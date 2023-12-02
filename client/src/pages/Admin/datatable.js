import React from 'react';
import { Button, Table, Tag } from 'antd';
const columns = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Game',
        dataIndex: 'game',
        key: 'game',
    },
    // {
    //     title: 'Tags',
    //     key: 'tags',
    //     dataIndex: 'tags',
    //     render: (_, { tags }) => (
    //         <>
    //             {tags.map((tag) => {
    //                 let color = tag.length > 5 ? 'geekblue' : 'green';
    //                 if (tag === 'beginner') {
    //                     color = 'volcano';
    //                 }
    //                 return (
    //                     <Tag color={color} key={tag}>
    //                         {tag.toUpperCase()}
    //                     </Tag>
    //                 );
    //             })}
    //         </>
    //     ),
    // },
    {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
            // <Space size="middle">
            //     <a>Invite {record.name}</a>
            //     <a>Delete</a>
            // </Space>
            <div className='flex flex-row'>
                <Button onClick={() => console.log(record.name)}>
                <a>Accept {record.name}</a>
            </Button>
                <Button onClick={ () => console.log(record.name)}>
                <a>Delete</a>
            </Button>
            </div>
        ),
    },
];
const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        game: '8XBet',
        tags: ['goo', 'developer'],
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        game: 'LoL',
        tags: ['beginner', 'gangster'],
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        game: 'CSGO',
        tags: ['middle', 'teacher'],
    },
];
const DataTable= () => <Table columns={columns} dataSource={data} />;
export default DataTable;