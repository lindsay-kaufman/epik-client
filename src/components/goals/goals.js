import React, { useState, useEffect, useMemo } from 'react'
import { useTable } from 'react-table'
import axios from 'axios'
import dayjs from 'dayjs'
import en from 'dayjs/locale/en'

import './goals.scss'

export const Goals = () => {
  const [goals, setData] = useState([])

  useEffect(() => {
    axios({
      url: 'http://localhost:3000/goals/1',
      method: 'GET',
      headers: { 'Content-Type': undefined },
    })
      .then(res => {
        setData(res.data)
      })
      .catch(console.error)
  }, [])


  dayjs.locale({
    ...en,
    weekStart: 1,
  })

  const startOfWeek = dayjs().startOf('week')

  // index of table column === index of weekday
  // how to change sunday to be index 0
  const weekdays = new Array(7)
    .fill(startOfWeek)
    .map((day, i) => day.add(i, 'day'))

  const columns = useMemo(
    () => [
      {
        Header: '',
        accessor: 'goal',
      },
      {
        Header: 'S',
        accessor: 'sun',
      },
      {
        Header: 'M',
        accessor: 'm',
      },
      {
        Header: 'T',
        accessor: 'tu',
      },
      {
        Header: 'W',
        accessor: 'w',
      },
      {
        Header: 'T',
        accessor: 'td',
      },
      {
        Header: 'F',
        accessor: 'f',
      },
      {
        Header: 'S',
        accessor: 'sat',
      },
    ],
    []
  )

  const Table = ({ columns, data }) => {
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
      useTable({ columns, data: goals })

    return (
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }

  return (
    <div className="goals">
      <div className="goals__title">Your Weekly Progress</div>
      <div className="goals__wrapper">
        <Table columns={columns} data={goals} />

        <div>
          {!goals
            ? 'Goals...'
            : goals.map(item => (
                <div className="goals__goal" key={item.id}>
                  {item.title}
                </div>
              ))}
        </div>
      </div>
    </div>
  )
}
