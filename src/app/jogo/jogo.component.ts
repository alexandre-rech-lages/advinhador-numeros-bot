import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-jogo',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: "jogo.component.html"
})
export class JogoComponent implements OnInit {
  title = 'advinhador-numeros';
  numeroSecreto: number = 0;
  numerosBotoes: number[] = [];

  numeroTentativas: number = 0;
  inputNumeroInformado: string = "";
  inputNumeroMenor: string = "0";
  inputNumeroMaior: string = "10";
  mensagem: string = "Informe um número entre 0 e " + 10;
  pontuacao: number = 100;
  numerosEscolhidos: number[] = [];
  nivelSelecionado: string = "Fácil";
  jogoEncerrado: boolean = false;
  jogadorAcertou : boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.novoJogo();
  }

  selecionarNivel(nivel: string) {
    this.nivelSelecionado = nivel;
    this.novoJogo();
  }

  chutar(): void {

    let numero = Number(this.inputNumeroInformado);

    this.registrarNumeroEscolhido(numero);
    this.mostrarDicas(numero);
    this.atualizarPontuacao(numero);

    this.numeroTentativas--;

    if (this.jogoTerminou()) {
     
      this.jogoEncerrado = true;

      if (this.ganhou()) {
        this.mensagem = `Você ganhou! E a sua pontuação foi ${this.pontuacao} pontos`;
        this.jogadorAcertou = true;
      }

      else if (this.perdeu()) {
        this.mensagem = `Você perdeu, o número secreto era ${this.numeroSecreto}`;
      }
    }

  }

  private registrarNumeroEscolhido(numero: number) {

    this.numerosEscolhidos.push(numero);
  }

  private mostrarDicas(numero: number) {
    if (numero < this.numeroSecreto) {
      this.mensagem = "O número informado é menor que o número secreto";
      this.inputNumeroMenor = this.inputNumeroInformado;
      this.inputNumeroInformado = "";
    }

    else if (numero > this.numeroSecreto) {
      this.mensagem = "O número informado é maior que o número secreto";
      this.inputNumeroMaior = this.inputNumeroInformado;
      this.inputNumeroInformado = "";
    }
  }

  private atualizarPontuacao(numero: number) {
    let diferencaPontucao = Math.abs(this.numeroSecreto - numero);

    if (diferencaPontucao >= 10)
      this.pontuacao -= 10;

    else if (diferencaPontucao >= 5 && diferencaPontucao <= 9)
      this.pontuacao -= 5;

    else if (diferencaPontucao >= 1 && diferencaPontucao <= 4)
      this.pontuacao -= 2;
  }

  jogoTerminou(): boolean {
    return this.ganhou() || this.perdeu();
  }

  ganhou(): boolean {
    return this.NumeroInformado === this.numeroSecreto;
  }

  perdeu(): boolean {
    return this.numeroTentativas === 0;
  }

  selecionarNumero(event: any) {
    this.inputNumeroInformado += event.target.innerText;
  }

  get NumeroInformado() {
    return Number(this.inputNumeroInformado);
  }

  novoJogo(): void {

    let numeroMaximo = this.obterNumeroMaximo();
    this.numeroTentativas = this.obterNumeroTentativas();
    this.pontuacao = 100;
    this.numeroSecreto = this.gerarNumeroAleatorio(1, numeroMaximo);
    this.numerosBotoes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    this.mensagem = `Informe um número entre 0 e ${numeroMaximo}`;
    this.inputNumeroMenor = "0";
    this.inputNumeroMaior = numeroMaximo.toString();
    this.inputNumeroInformado = "";
    this.numerosEscolhidos = [];
    this.jogoEncerrado = false;      
    this.jogadorAcertou = false;
  }

  gerarNumeroAleatorio(min:number, max:number) {
    return Math.floor(Math.random() * max) + min;
  }

  private obterNumeroMaximo() {

    if (this.nivelSelecionado === "Fácil") return 10;

    else if (this.nivelSelecionado === "Médio") return 50;

    else if (this.nivelSelecionado === "Difícil") return 100;

    return 10;
  }

  private obterNumeroTentativas() {

    if (this.nivelSelecionado === "Fácil") return 3;

    else if (this.nivelSelecionado === "Médio") return 6;

    else if (this.nivelSelecionado === "Difícil") return 7;

    return 3;

  }

}
