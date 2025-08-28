import React from 'react'
import CreateBudgetList from './CreateBudgetList'

const BudgetList = () => {
  return (
    <div className='mt-7'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'> 

      <CreateBudgetList/>
      </div>
    </div>
  )
}

export default BudgetList
