import React, {useMemo, useState} from 'react'
import {useTable, useGlobalFilter} from 'react-table'
import MOCK_DATA from '../TableSeguimiento/MOCK_DATA.json'
import {COLUMNS} from './ColumnsSeguimiento'
import './TableSeguimiento.css'
import SlideSeguimiento from '../TableSeguimiento/SlideSeguimiento';


/*----------CREAR EL FONDO DE LA PANTALLA----------- */


function TableSeguimiento () {
    const columns = useMemo(() => COLUMNS, [])
    const data = useMemo(() => MOCK_DATA,[])

    const {
        getTableProps, 
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } =  useTable({
      columns,
      data
    }, useGlobalFilter)
  
  const [isShown, setIsShown] = useState(false);

  function handleClick (e){
    setIsShown(!isShown);
    return isShown;
  };


  return (
    <>
    <div className='sidebar'> 
        <SlideSeguimiento abierto={isShown}/>
    </div>

    <input className='intbl2' placeholder='0001'></input>

    <table className='tseg' {...getTableProps()}>
         <thead>
             {headerGroups.map((headerGroup)=> (
                <tr {...headerGroup.getHeaderGroupProps}>  
                    {headerGroup.headers.map((column) => ( 
                        <th {...column.getHeaderProps()}>{column.render('Header')}</th> 
                    ))}       
                </tr>
             ))}
         </thead>
         <tbody {...getTableBodyProps()}> 
         {rows.map((row) => {
                prepareRow(row)
                return ( 
                    <tr {...row.getRowProps()} onClick={handleClick}>
                        {row.cells.map((cell) => {
                            return  <td {...cell.getCellProps()}>{cell.render('Cell')}</td>      
                        })}  
                    </tr>
                )     
            })}

         </tbody>
    </table> 
    </>
  )
}

export default TableSeguimiento