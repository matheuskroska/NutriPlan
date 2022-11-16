import { t } from 'i18next'
import React  from 'react'
import { Pie } from 'react-chartjs-2'

export const MacroNutriChart = (props) => {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: t('macroNutri') + ' (%)',
            },
        },
    }
    const dataMacroNutri = {
        labels: [t('carbs'), t('fat'), t('protein')],
        datasets: [
            {
                data: props.macroNutri,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.7)',
                  'rgba(54, 162, 235, 0.7)',
                  'rgba(255, 206, 86, 0.7)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
            }
        ],
    }

    return (
        <Pie options={options} data={dataMacroNutri} />
    )
}