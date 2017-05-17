package projeto.util;

import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
public class CardsDashBoard {
	
	private int idProjeto;
	private String nomeProjeto;
	private Date dataCriacao;
	private Date dataEntrega;
	private int totalTarefas;
	private float porcentPendente;
	private float porcentAndamento;
	private float porcentConcluido;
	
	public int getIdProjeto() {
		return idProjeto;
	}
	public void setIdProjeto(int idProjeto) {
		this.idProjeto = idProjeto;
	}
	public String getNomeProjeto() {
		return nomeProjeto;
	}
	public void setNomeProjeto(String nomeProjeto) {
		this.nomeProjeto = nomeProjeto;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public Date getDataEntrega() {
		return dataEntrega;
	}
	public void setDataEntrega(Date dataEntrega) {
		this.dataEntrega = dataEntrega;
	}
	public int getTotalTarefas() {
		return totalTarefas;
	}
	public void setTotalTarefas(int totalTarefas) {
		this.totalTarefas = totalTarefas;
	}
	public float getPorcentPendente() {
		return porcentPendente;
	}
	public void setPorcentPendente(float porcentPendente) {
		this.porcentPendente = porcentPendente;
	}
	public float getPorcentAndamento() {
		return porcentAndamento;
	}
	public void setPorcentAndamento(float porcentAndamento) {
		this.porcentAndamento = porcentAndamento;
	}
	public float getPorcentConcluido() {
		return porcentConcluido;
	}
	public void setPorcentConcluido(float porcentConcluido) {
		this.porcentConcluido = porcentConcluido;
	} 

}
