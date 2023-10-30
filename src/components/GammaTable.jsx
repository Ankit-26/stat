import React from "react";
import { dataSet } from "../common/data";
import {
  calculateMean,
  calculateMedian,
  calculateMode,
} from "../utils/functions";

function GammaTable() {
  let gammaDataSet = dataSet.map(entry => {
    entry["Gamma"] = (entry["Ash"] * entry["Hue"]) / entry["Magnesium"];
    return entry;
  });

  const gammaAllGroupedData = Object.keys(gammaDataSet[0]).map(property => {
    const gammaGroupedData = {};
    gammaDataSet.forEach(entry => {
      const propertyClass = entry?.[property];
      if (!gammaGroupedData[propertyClass]) {
        gammaGroupedData[propertyClass] = [];
      }
      gammaGroupedData[propertyClass].push(entry?.Gamma);
    });

    const classStats = Object.keys(gammaGroupedData).map(classProperty => {
      const gammaValues = gammaGroupedData[classProperty];
      const mean = calculateMean(gammaValues);
      const median = calculateMedian(gammaValues);
      const mode = calculateMode(gammaValues);
      return { classProperty, mean, median, mode };
    });

    return { [property]: classStats };
  });

  return (
    <div className="ln-flav-table">
      <h2>Gamma Statistics</h2>
      {gammaAllGroupedData.map(propertyTable => {
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

export default GammaTable;
