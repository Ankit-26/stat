import React from "react";
import { dataSet } from "../common/data";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../utils/functions";

function FlavanoidsTable() {
  const flavanoidsAllGroupedData = Object.keys(dataSet[0]).map(property => {
    const flavanoidsGroupedData = {};
    dataSet.forEach(entry => {
      const propertyClass = entry?.[property];
      if (!flavanoidsGroupedData[propertyClass]) {
        flavanoidsGroupedData[propertyClass] = [];
      }
      flavanoidsGroupedData[propertyClass].push(entry?.Flavanoids);
    });

    const classStats = Object.keys(flavanoidsGroupedData).map(classProperty => {
      const flavanoidsValues = flavanoidsGroupedData[classProperty];
      const mean = calculateMean(flavanoidsValues);
      const median = calculateMedian(flavanoidsValues);
      const mode = calculateMode(flavanoidsValues);
      return { classProperty, mean, median, mode };
    });

    return { [property]: classStats };
  });

  return (
    <div className="ln-flav-table">
      <h2>Flavanoids Statistics</h2>
      {flavanoidsAllGroupedData.map(propertyTable => {
        return (
          <table>
            <thead>
              <tr>
                <th>Measure</th>
                {Object.values(propertyTable)?.[0].map(propertyClassStat => (
                  <th key={propertyClassStat.classProperty}>
                    {Object.keys(propertyTable)?.[0]}{" "}
                    {propertyClassStat.classProperty}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Flavanoids Mean</td>
                {Object.values(propertyTable)?.[0].map(propertyClassStat => (
                  <td key={propertyClassStat.classProperty}>
                    {propertyClassStat.mean.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Median</td>
                {Object.values(propertyTable)?.[0].map(propertyClassStat => (
                  <td key={propertyClassStat.classProperty}>
                    {propertyClassStat.median.toFixed(2)}
                  </td>
                ))}
              </tr>
              <tr>
                <td>Flavanoids Mode</td>
                {Object.values(propertyTable)?.[0].map(propertyClassStat => (
                  <td key={propertyClassStat.classProperty}>
                    {propertyClassStat.mode.join(", ")}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      })}
    </div>
  );
}

export default FlavanoidsTable;
