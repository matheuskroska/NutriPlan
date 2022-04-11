import React from 'react'
import { StyledLoader } from './Loader.elements'
import { ScaleLoader } from 'react-spinners'

export const Loader = () => {
  return (
    <><StyledLoader><ScaleLoader color="var(--primary)"/></StyledLoader></>
  )
}
