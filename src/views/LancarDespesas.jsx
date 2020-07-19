import React from "react";
import { withRouter } from "react-router";
import server from "../services/api"
import TextInputMask from "react-masked-text"

class LancarDespesas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            form: {
                valor: "",
                vencimento: "",
                tipo: "",
                fornecedor: "",
                pago: ""
            },
            errors: {},
        };
        this.cadastroDespesa = this.cadastroDespesa.bind(this);
        this.handleStates = this.handleStates.bind(this);
        this.handleSelects = this.handleSelects.bind(this)
        this.validacaoPadrao = this.validacaoPadrao.bind(this);
        this.verificarInputs = this.verificarInputs.bind(this);

        this.campoDataVencimento = React.createRef();
    }

    cadastroDespesa(event) {
        event.preventDefault();

        let val = this.state.form.valor.match(/[\d\.\,]+/);
        val = Number(val ? val[0].replace(/\./g, '').replace(',', '.') : 0);

        let list = {
            valor: val,
            vencimento: this.state.form.vencimento,
            tipo: this.state.form.tipo,
            fornecedor: this.state.form.fornecedor,
            pago: this.state.form.pago,
            idUser: localStorage.getItem("id")
        }

        server
            .post("despesas/cadastro", list, {
                headers: { Authorization: "Bearer " + localStorage.getItem("token") }
            })
            .then(res => {
                this.setState({
                    form: {
                        valor: "",
                        vencimento: "",
                        tipo: "",
                        fornecedor: "",
                        pago: ""
                    }
                })
            }, err => {
                this.setState({ erroBack: err })
            });
    }

    handleStates(obj, name) {
        let tipo = name;
        let valor = obj;
        this.setState((oldState) => ({
            form: {
                ...oldState.form,
                [tipo]: valor,
            },
        }));
    }

    handleSelects(obj, name) {
        let tipo = name;
        let valor = obj.target.value
        this.setState((oldState) => ({
            form: {
                ...oldState.form,
                [tipo]: valor,
            },
        }));
    }

    validacaoPadrao(campo, length = 1) {
        let erros = this.state.errors;
        if (this.state.form[campo].length >= length) {
            delete erros[campo]
        } else {
            erros[campo] = true
        }

        this.setState({
            errors: erros,
        });
    }

    verificarInputs() {
        let err = this.state.erros || {};
        for (let x in this.state.form) {
            if (!this.state.form[x] || this.state.form[x].length <= 0) {
                err[x] = true;
            }
        }
        return Object.keys(err).length > 0;
    }

    render() {
        let btnDisabled = this.verificarInputs();
        return (
            <div className="container">
                <div className="col-lg-12">
                    <form onSubmit={this.cadastroDespesa}>
                        <div className="form-row">
                            <div className="form-group col-lg-8">
                                {/* Valor */}
                                <TextInputMask
                                    kind={'money'}
                                    className={
                                        "form-control custom-input" +
                                        (this.state.errors.valor ? " is-invalid" : " ")
                                    }
                                    placeholder="Valor da despesa"
                                    value={this.state.form.valor}
                                    name="valor"
                                    onChangeText={(str) => this.handleStates(str, "valor")}
                                    onBlur={() => this.validacaoPadrao("valor", 1, null)}
                                />
                                <div className="invalid-feedback">Campo de valor obrigatório</div>
                            </div>
                            <div className="form-group col-lg-4">
                                {/* data vencimento */}
                                <TextInputMask
                                    kind="datetime"
                                    type={"datetime"}
                                    options={{
                                        format: 'DD/MM/YYYY'
                                    }}
                                    value={this.state.form.vencimento}
                                    name="vencimento"
                                    onChangeText={(str) => this.handleStates(str, "vencimento")}
                                    className={
                                        "form-control custom-input" +
                                        (this.state.errors.vencimento ? " is-invalid" : " ")
                                    }
                                    placeholder="Data vencimento"
                                    onBlur={() => this.validacaoPadrao('vencimento', 10, null)}
                                />
                                <div className="invalid-feedback">Data de vencimento obrigatório!</div>
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group col-lg-5">
                                {/* tipo */}
                                <select
                                    className={'custom-select' + (this.state.errors.tipo ? " is-invalid" : " ")}
                                    name="tipo"
                                    value={this.state.form.tipo}
                                    onChange={(str) => this.handleSelects(str, "tipo")}
                                    onBlur={() => this.validacaoPadrao("tipo")}
                                >
                                    <option className='d-none' value={undefined} >Tipos</option>
                                    <option value={"Água"} >Água</option>
                                    <option value={"Luz"} >Luz</option>
                                    <option value={"Alimentação"} >Alimentação</option>
                                    <option value={"Entreterimento"} >Entreterimento</option>
                                </select>
                                <div className="invalid-feedback">
                                    Selecione o tipo de despesa!
                                </div>
                            </div>
                            <div className="form-group col-lg-5">
                                {/* tipo */}
                                <select
                                    className={'custom-select' + (this.state.errors.fornecedor ? " is-invalid" : " ")}
                                    name="fornecedor"
                                    value={this.state.form.fornecedor}
                                    onChange={(str) => this.handleSelects(str, "fornecedor")}
                                    onBlur={() => this.validacaoPadrao("fornecedor")}
                                >
                                    <option className='d-none' value={undefined} >Fornecedor</option>
                                    <option value={"Corsan"} >Corsan</option>
                                    <option value={"RGA"} >RGA</option>
                                    <option value={"CooperLuz"} >CooperLuz</option>
                                    <option value={"Show Time"} >Show Time</option>
                                </select>
                                <div className="invalid-feedback">
                                    Selecione o fornecedor!
                                </div>
                            </div>
                        </div>
                        <div className="form-group col-lg-5">
                            {/* pago */}
                            <select
                                className={'custom-select' + (this.state.errors.pago ? " is-invalid" : " ")}
                                name="pago'"
                                value={this.state.form.pago}
                                onChange={(str) => this.handleSelects(str, "pago")}
                                onBlur={() => this.validacaoPadrao("pago")}
                            >
                                <option className='d-none' value={undefined} >Pago?</option>
                                <option value={"Sim"} >Sim</option>
                                <option value={"Não"} >Não</option>
                            </select>
                            <div className="invalid-feedback">
                                Informe o status da despesa!
                            </div>
                        </div>
                        <div className={"form-group text-center mt-5"}>
                            <button className='btn-custom-primary' onClick={this.cadastroDespesa}
                            // disabled={btnDisabled} 
                            >Concluir Cadastro</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default withRouter(LancarDespesas);
