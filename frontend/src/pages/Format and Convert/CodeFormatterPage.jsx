import React from 'react'
import CodeFormatter from '../../components/validator_feature/CodeFormatter'

const CodeFormatterPage = ({ isDarkMode }) => {
  return (
    <div><CodeFormatter isDarkMode={isDarkMode}/></div>
  )
}

export default CodeFormatterPage