import React from "react";
import { withRouter } from "react-router";
import ChartArea from "../components/charts/ChartArea";
import ChartPie from "../components/charts/ChartPie";
import server from "../services/api"
import "../styles/charts.scss"

class dash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: "",
            socios: {
                colors: ['#9b4a97'],
                title: {
                    text: "Adesões de sócios por mês",
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                xaxis: {
                    categories: [],
                }
            },
            sociosDados: [
                {
                    name: ["Sócios"],
                    data: []
                }
            ],

            //====================================================================

            qr: {
                colors: ["#ffcd00"],
                title: {
                    text: "Notas lidas por mês"
                },
                chart: {
                    toolbar: {
                        show: false,
                    }
                },
                xaxis: {
                    categories: []
                }
            },
            qrDados: [
                {
                    name: ["Notas"],
                    data: []
                }
            ],

            //=================================================================

            parceiros: {
                title: {
                    text: "Notas lidas por parceiros"
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                labels: []
            },
            parceirosDados: [],

            sociosAtivos: "",
            sociosInadimplentes: "",
            totalDependentes: "",
            mediaDepentes: ""

        }
        this.buscarDados = this.buscarDados.bind(this)
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        server
            .get("dash/assoc-mes")
            .then(res => {
                let mes;
                let arrayTratado = []
                for (let x in res.data) {
                    switch (res.data[x]._id.mes) {
                        case 1: mes = "Jan"; break;
                        case 2: mes = "Fev"; break;
                        case 3: mes = "Mar"; break;
                        case 4: mes = "Abr"; break;
                        case 5: mes = "Mai"; break;
                        case 6: mes = "Jun"; break;
                        case 7: mes = "Jul"; break;
                        case 8: mes = "Ago"; break;
                        case 9: mes = "Set"; break;
                        case 10: mes = "Out"; break;
                        case 11: mes = "Nov"; break;
                        case 12: mes = "Dez"; break;
                        default: break;
                    }
                    arrayTratado.push({ total: res.data[x].count, categorias: mes + " / " + res.data[x]._id.ano, mes: res.data[x]._id.mes, ano: res.data[x]._id.ano })
                }

                arrayTratado.sort(function (a, b) {
                    return parseInt(`${a.ano}${a.mes}`) - parseInt(`${b.ano}${b.mes}`);
                });

                this.setState((oldState) => ({
                    ...oldState,
                    socios: {
                        xaxis: {
                            categories: arrayTratado.map(x => x.categorias)
                        }
                    },
                    sociosDados: [{ data: arrayTratado.map(x => x.total) }]
                }))

            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });


        server
            .get("dash/notas-mes")
            .then(res => {
                let arrayNotas = [];
                let mes;
                for (let x in res.data) {
                    switch (res.data[x]._id.mes) {
                        case 1: mes = "Jan"; break;
                        case 2: mes = "Fev"; break;
                        case 3: mes = "Mar"; break;
                        case 4: mes = "Abr"; break;
                        case 5: mes = "Mai"; break;
                        case 6: mes = "Jun"; break;
                        case 7: mes = "Jul"; break;
                        case 8: mes = "Ago"; break;
                        case 9: mes = "Set"; break;
                        case 10: mes = "Out"; break;
                        case 11: mes = "Nov"; break;
                        case 12: mes = "Dez"; break;
                        default: break;
                    }
                    arrayNotas.push({ total: res.data[x].count, categorias: mes + " / " + res.data[x]._id.ano, mes: res.data[x]._id.mes, ano: res.data[x]._id.ano })
                }

                arrayNotas.sort(function (a, b) {
                    return parseInt(`${a.ano}${a.mes}`) - parseInt(`${b.ano}${b.mes}`);
                });
                this.setState((oldState) => ({
                    ...oldState,
                    qr: {
                        xaxis: {
                            categories: arrayNotas.map(x => x.categorias)
                        }
                    },
                    qrDados: [{ data: arrayNotas.map(x => x.total) }]
                }))

            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });

        server
            .get("dash/total-status")
            .then(res => {
                this.setState((oldState) => ({
                    ...oldState,
                    sociosAtivos: res.data.ativos,
                    totalDependentes: res.data.depts_ativos,
                    mediaDepentes: parseFloat(res.data.depts_ativos / res.data.ativos).toFixed(2).replace(".", ","),
                    sociosInadimplentes: res.data.inativos
                }))
            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });

        server
            .get("dash/notas-parceiro")
            .then(res => {
                let arrayNotasParceiros = []
                for (let x in res.data) {
                    arrayNotasParceiros.push({ total: res.data[x].count, labels: res.data[x]._id })
                }

                this.setState({
                    parceirosDados: arrayNotasParceiros.map(x => x.total),
                    parceiros: {
                        labels: arrayNotasParceiros.map(x => x.labels)
                    }
                })
            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });
    }

    render() {
        return (
            <>
                <div className='row mt-3'>
                    <div className='col-lg-3 col-sm-6 col-md-6 mt-3'>
                        <div className='card p-4'>
                            <strong className='titleCard'>Sócios ativos</strong>
                            <label className='cards'>{this.state.sociosAtivos}</label>
                        </div>
                    </div>
                    <div className='col-lg-3 col-sm-6 col-md-6 mt-3'>
                        <div className='card p-4'>
                            <strong className='titleCard'>Total dependentes</strong>
                            <label className='cards'>{this.state.totalDependentes}</label>
                        </div>
                    </div>
                    <div className='col-lg-3 col-sm-6 col-md-6 mt-3'>
                        <div className='card p-4'>
                            <strong className='titleCard'>Média dependentes</strong>
                            <label className='cards'>{this.state.mediaDepentes}</label>
                        </div>
                    </div>
                    <div className='col-lg-3 col-sm-6 col-md-6 mt-3'>
                        <div className='card p-4'>
                            <strong className='titleCard'>Sócios inadimplentes</strong>
                            <label className='cards'>{this.state.sociosInadimplentes}</label>
                        </div>
                    </div>
                </div>
                <div className='row pt-5 justify-content-lg-center'>
                    <div className='col-lg-6 mt-2 transparency'>
                        <ChartArea
                            options={this.state.socios}
                            series={this.state.sociosDados}
                        />
                    </div>

                    <div className='col-lg-6 mt-2 transparency'>
                        <ChartArea
                            options={this.state.qr}
                            series={this.state.qrDados}
                        />
                    </div>
                    <div className='col-lg-6 mt-2 mb-3 transparency'>
                        <ChartPie
                            options={this.state.parceiros}
                            series={this.state.parceirosDados}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(dash)