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
            totalContas: "",
            totalContasMes: "",
            msg: "",
            despesas: {
                colors: ['#9b4a97'],
                title: {
                    text: "Total de despesas por mês",
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
            despesasDados: [
                {
                    name: ["Despesas"],
                    data: []
                }
            ],

            tipos: {
                title: {
                    text: "Contas por tipo"
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                labels: []
            },
            tipoDados: [],

            fornecedor: {
                title: {
                    text: "Contas por fornecedor"
                },
                chart: {
                    toolbar: {
                        show: false,
                    },
                },
                labels: []
            },
            fornecedorDados: [],


        }
        this.buscarDados = this.buscarDados.bind(this)
    }

    componentDidMount() {
        this.buscarDados()
    }

    buscarDados() {
        // server
        //     .get(`despesas/mes/${localStorage.getItem("id")}`)
        //     .then(res => {
        //         console.log(res);

        //         let mes;
        //         let arrayTratado = []
        //         for (let x in res.data) {
        //             switch (res.data[x]._id.mes) {
        //                 case 1: mes = "Jan"; break;
        //                 case 2: mes = "Fev"; break;
        //                 case 3: mes = "Mar"; break;
        //                 case 4: mes = "Abr"; break;
        //                 case 5: mes = "Mai"; break;
        //                 case 6: mes = "Jun"; break;
        //                 case 7: mes = "Jul"; break;
        //                 case 8: mes = "Ago"; break;
        //                 case 9: mes = "Set"; break;
        //                 case 10: mes = "Out"; break;
        //                 case 11: mes = "Nov"; break;
        //                 case 12: mes = "Dez"; break;
        //                 default: break;
        //             }
        //             arrayTratado.push({ total: res.data[x].count, categorias: mes + " / " + res.data[x]._id.ano, mes: res.data[x]._id.mes, ano: res.data[x]._id.ano })
        //         }

        //         arrayTratado.sort(function (a, b) {
        //             return parseInt(`${a.ano}${a.mes}`) - parseInt(`${b.ano}${b.mes}`);
        //         });

        //         this.setState((oldState) => ({
        //             ...oldState,
        //             despesas: {
        //                 xaxis: {
        //                     categories: arrayTratado.map(x => x.categorias)
        //                 }
        //             },
        //             despesasDados: [{ data: arrayTratado.map(x => x.total) }]
        //         }))

        //     }, err => {
        //         this.setState({ msg: "Erro ao buscar dados" })
        //     });


        server
            .get(`despesas/total/${localStorage.getItem("id")}`)
            .then(res => {
                console.log(res.data);

                this.setState({
                    totalContas: res.data[0].count
                })
            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });

        // server
        //     .get(`despesas/atual/${localStorage.getItem("id")}`)
        //     .then(res => {
        //         console.log(res);
        //     }, err => {
        //         this.setState({ msg: "Erro ao buscar dados" })
        //     });

        server
            .get(`despesas/tipo/${localStorage.getItem("id")}`)
            .then(res => {
                let arrayContasTipos = []
                for (let x in res.data) {
                    arrayContasTipos.push({ total: res.data[x].count, labels: res.data[x]._id })
                }

                this.setState({
                    tipoDados: arrayContasTipos.map(x => x.total),
                    tipos: {
                        labels: arrayContasTipos.map(x => x.labels)
                    }
                })
            }, err => {
                this.setState({ msg: "Erro ao buscar dados" })
            });

        server
            .get(`despesas/fornecedor/${localStorage.getItem("id")}`)
            .then(res => {
                let arrayContasTipos = []
                for (let x in res.data) {
                    arrayContasTipos.push({ total: res.data[x].count, labels: res.data[x]._id })
                }

                this.setState({
                    fornecedorDados: arrayContasTipos.map(x => x.total),
                    fornecedor: {
                        labels: arrayContasTipos.map(x => x.labels)
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
                            <strong className='titleCard'>Contas a pagar</strong>
                            <label className='cards'>{this.state.totalContas}</label>
                        </div>
                    </div>
                    {/* <div className='col-lg-3 col-sm-6 col-md-6 mt-3'>
                        <div className='card p-4'>
                            <strong className='titleCard'>Total contas do mês</strong>
                            <label className='cards'>{this.state.totalContasMes}</label>
                        </div>
                    </div> */}
                </div>
                <div className='row pt-5 justify-content-lg-center'>
                    {/* <div className='col-lg-6 mt-2 transparency'>
                        <ChartArea
                            options={this.state.despesas}
                            series={this.state.despesasDados}
                        />
                    </div> */}
                    <div className='col-lg-6 mt-2 mb-3 transparency'>
                        <ChartPie
                            options={this.state.tipos}
                            series={this.state.tipoDados}
                        />
                    </div>
                    <div className='col-lg-6 mt-2 mb-3 transparency'>
                        <ChartPie
                            options={this.state.fornecedor}
                            series={this.state.fornecedorDados}
                        />
                    </div>
                </div>
            </>
        );
    }
}

export default withRouter(dash)