import React from 'react'
import styled from 'styled-components'

const Flag = ({ image, isSelected, ...props }) => (
    <img alt="flag" src={image} className={isSelected ? 'flag selected' : 'flag'} {...props} />
)

export const StyledFlag = styled(Flag)`
    &:first-child {
        margin-right: 10px;
    }
`
