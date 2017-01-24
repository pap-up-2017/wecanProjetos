package projeto.entity;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate reconhecer que deve mapear essa classe
@Entity
public class Projeto {
	
	// tag para indicar o id da classe
	@Id
	// indica para que o id seja criado automaticamente.
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idProjeto;
	private String nome;
	private Date dataCriacao;
	private int vagas;
	private int participantes;
	//TODO Verificar se isso não vai na tabela fraca de projeto x partifipante
	private String competencia;
	//Dono do projeto
	private String organizador;
	private String descricao;
	
	//TODO desenvolver função para usuário se inscrever no projeto
	
	//TODO Desenvolver integração com Feed, acho que o feed será todo a parte desse código
	
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public int getVagas() {
		return vagas;
	}
	public void setVagas(int vagas) {
		this.vagas = vagas;
	}
	public int getParticipantes() {
		return participantes;
	}
	public void setParticipantes(int participantes) {
		this.participantes = participantes;
	}
	public String getCompetencia() {
		return competencia;
	}
	public void setCompetencia(String competencia) {
		this.competencia = competencia;
	}
	public String getOrganizador() {
		return organizador;
	}
	public void setOrganizador(String organizador) {
		this.organizador = organizador;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	


}
