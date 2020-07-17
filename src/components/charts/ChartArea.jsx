import React from "react";
import Chart from "react-apexcharts"

class ChartArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Chart
                options={this.props.options}
                series={this.props.series}
                type="area"
            />
        );
    }
}

export default ChartArea