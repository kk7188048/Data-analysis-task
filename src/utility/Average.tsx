interface CropData {
    Country: string;
    Year: string;
    'Crop Name': string;
    'Crop Production (UOM:t(Tonnes))': string | number;
    'Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))': string | number;
    'Area Under Cultivation (UOM:Ha(Hectares))': string | number;
}

interface AggregatedData {
    year: string;
    maxProductionCrop: string;
    minProductionCrop: string;
}

interface CropStats {
    cropName: string;
    averageYield: number;
    averageCultivationArea: number;
}

const extractYear = (yearString: string): string => {
    const match = yearString.match(/\d{4}/);
    return match ? match[0] : '';
};

export const aggregateData = (data: CropData[]): { yearlyData: AggregatedData[], cropStats: CropStats[] } => {
    const yearlyDataMap: { [year: string]: { max: CropData, min: CropData } } = {};
    const cropStatsMap: { [crop: string]: { totalYield: number, totalArea: number, count: number } } = {};

    data.forEach((record) => {
        const production = Number(record['Crop Production (UOM:t(Tonnes))']) || 0;
        const yieldValue = Number(record['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))']) || 0;
        const area = Number(record['Area Under Cultivation (UOM:Ha(Hectares))']) || 0;
        const year =extractYear(record.Year);
        const crop = record['Crop Name'];

        // Yearly data aggregation
        if (!yearlyDataMap[year]) {
            yearlyDataMap[year] = { max: record, min: record };
        } else {
            if (production > Number(yearlyDataMap[year].max['Crop Production (UOM:t(Tonnes))'])) {
                yearlyDataMap[year].max = record;
            }
            if (production < Number(yearlyDataMap[year].min['Crop Production (UOM:t(Tonnes))'])) {
                yearlyDataMap[year].min = record;
            }
        }

        // Crop stats aggregation
        if (!cropStatsMap[crop]) {
            cropStatsMap[crop] = { totalYield: yieldValue, totalArea: area, count: 1 };
        } else {
            cropStatsMap[crop].totalYield += yieldValue;
            cropStatsMap[crop].totalArea += area;
            cropStatsMap[crop].count += 1;
        }
    });

    const yearlyData = Object.keys(yearlyDataMap).map((year) => ({
        year,
        maxProductionCrop: yearlyDataMap[year].max['Crop Name'],
        minProductionCrop: yearlyDataMap[year].min['Crop Name'],
    }));

    const cropStats = Object.keys(cropStatsMap).map((crop) => ({
        cropName: crop,
        averageYield: parseFloat((cropStatsMap[crop].totalYield / cropStatsMap[crop].count).toFixed(3)),
        averageCultivationArea: parseFloat((cropStatsMap[crop].totalArea / cropStatsMap[crop].count).toFixed(3)),
    }));

    return { yearlyData, cropStats };
};
