"use client";
import { useEffect, useRef } from "react";
// 导入 D3.js 的所有模块
import * as d3 from "d3";
// 使用 d3 选中页面的所有 div 元素
// const div = d3.selectAll("div");

const D3Com: React.FC = () => {
    const divRef = useRef<any>();
    useEffect(() => {
        // Set Dimensions
        const xSize = 500;
        const ySize = 500;
        const margin = 40;
        const xMax = xSize - margin * 2;
        const yMax = ySize - margin * 2;

        // Create Random Points
        const numPoints = 100;
        const data = [];
        for (let i = 0; i < numPoints; i++) {
            data.push([Math.random() * xMax, Math.random() * yMax]);
        }

        // Append SVG Object to the Page
        const svg = d3.select(divRef.current)
            .append("svg")
            .append("g")
            .attr("transform", "translate(" + margin + "," + margin + ")");

        // X Axis
        const x = d3.scaleLinear()
            .domain([0, 500])
            .range([0, xMax]);

        svg.append("g")
            .attr("transform", "translate(0," + yMax + ")")
            .call(d3.axisBottom(x));

        // Y Axis
        const y = d3.scaleLinear()
            .domain([0, 500])
            .range([yMax, 0]);

        svg.append("g")
            .call(d3.axisLeft(y));

        // Dots
        svg.append('g')
            .selectAll("dot")
            .data(data).enter()
            .append("circle")
            .attr("cx", function (d) { return d[0] })
            .attr("cy", function (d) { return d[1] })
            .attr("r", 3)
            .style("fill", "Red");
        //  d3.select(divRef.current).text("Hello World!");
    }, [])

    return (
        <>
            <svg ref={divRef} style={{width:'500px', height: '500px'}}></svg>
        </>
    )
}

export default D3Com;

