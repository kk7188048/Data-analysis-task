import React from 'react';
import { Table } from '@mantine/core';
import { aggregateData } from '../utility/Average';
import data from '../data/Data.json';
import styles from '../Table.module.css'; 

import '@mantine/core/styles.css';


const DataTable: React.FC = () => {
    const { yearlyData, cropStats } = aggregateData(data);

    return (
        <div>
            <h2>Yearly Crop Production</h2>
            <Table horizontalSpacing="md" verticalSpacing="md" withTableBorder withColumnBorders withRowBorders className={styles.table} >
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th>Year</Table.Th>
                        <Table.Th>Crop with Maximum
                            Production in that Year</Table.Th>
                        <Table.Th>Crop with Minimum
                            Production in that Year</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <tbody>
                    {yearlyData.map((row) => (
                        <Table.Tr key={row.year}>
                            <Table.Td>{row.year}</Table.Td>
                            <Table.Td>{row.maxProductionCrop}</Table.Td>
                            <Table.Td>{row.minProductionCrop}</Table.Td>
                        </Table.Tr>
                    ))}
                </tbody>
            </Table>

            <h2>Crop Statistics (1950-2020)</h2>
            <Table withColumnBorders withRowBorders horizontalSpacing="md" verticalSpacing="md" className={styles.table}>
                <thead>
                    <Table.Tr>
                        <Table.Th>Crop</Table.Th>
                        <Table.Th>Average Yield of the
                            Crop between
                            1950-2020
                        </Table.Th>
                        <Table.Th>Average Cultivation Area
                            of the Crop between
                            1950-2020</Table.Th>
                    </Table.Tr>
                </thead>
                <tbody>
                    {cropStats.map((row) => (
                        <Table.Tr key={row.cropName}>
                            <Table.Td>{row.cropName}</Table.Td>
                            <Table.Td>{row.averageYield}</Table.Td>
                            <Table.Td>{row.averageCultivationArea}</Table.Td>
                        </Table.Tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default DataTable;
