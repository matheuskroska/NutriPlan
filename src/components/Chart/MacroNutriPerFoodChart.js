import { t } from 'i18next'
import _ from 'lodash'
import React, { useState }  from 'react'
import { Bar } from 'react-chartjs-2'

export const MacroNutriPerFoodChart = (props) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: t('macroNutriPerFood') + ' (%)',
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        
    }
    
    const dataMacroNutri = {
        labels: props.macroNutri.labels,
        datasets: [
            {
                label: t('carbs'),
                data: _.map(props.macroNutri.data, (data, key) => data.carbs),
                backgroundColor: 'rgb(255, 99, 132)',
                stack: 'Stack 0',
            },
            {
                label: t('fat'),
                data: _.map(props.macroNutri.data, (data, key) => data.fat),
                backgroundColor: 'rgb(75, 192, 192)',
                stack: 'Stack 1',
            },
            {
                label: t('fat'),
                data: _.map(props.macroNutri.data, (data, key) => data.protein),
                backgroundColor: 'rgb(53, 162, 235)',
                stack: 'Stack 2',
            },
        ]
    }
    

    return (
        <Bar options={options} data={dataMacroNutri} />
    )
}