import React, { useState } from 'react'
import styled from 'styled-components'


export const Flag = ({ image, isSelected, ...props }) => (
    <img type="image" alt="flag" src={image} className={isSelected ? 'flag selected' : 'flag'} {...props} />
)


export const FlagContainer = styled.div`

    img:first-child {
        margin-right: 10px;
    }

    img {
        cursor: pointer;
        box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
        border-radius: 10px;
    }
    
    img:not(.selected) {
        filter: opacity(0.4)
    }
`
