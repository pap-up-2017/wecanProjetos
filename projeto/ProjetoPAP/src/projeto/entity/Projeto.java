package projeto.entity;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
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
	@ManyToMany
	private List<Competencia> competencias;
	@ManyToMany
	private List<Usuario> usuarios;
	
	//Dono do projeto
	@OneToOne
	private Usuario organizador;
	private String descricao;
	private Date dataEntrega;
	private String status;
	
	//TODO desenvolver função para usuário se inscrever no projeto
	
	//TODO Desenvolver integração com Feed, acho que o feed será todo a parte desse código
	
	public int getIdProjeto() {
		return idProjeto;
	}
	public void setIdProjeto(int idProjeto) {
		this.idProjeto = idProjeto;
	}
	
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
	public Usuario getOrganizador() {
		return organizador;
	}
	public void setOrganizador(Usuario organizador) {
		this.organizador = organizador;
	}
	public String getDescricao() {
		return descricao;
	}
	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}
	public List<Competencia> getCompetencias() {
		return competencias;
	}
	public void setCompetencias(List<Competencia> competencias) {
		this.competencias = competencias;
	}
	public Date getDataEntrega() {
		return dataEntrega;
	}
	public void setDataEntrega(String dataEntrega) {
		
		
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

	    try {
	        java.util.Date utilDate = format.parse(dataEntrega);
	        java.sql.Date sqlDate = new java.sql.Date(utilDate.getTime());
	        this.dataEntrega = sqlDate;
	    } catch (ParseException e) {
	        e.printStackTrace();
	    }
		
		
	}
	
	public void setDataEntrega(Date dataEntrega) {
		
	        this.dataEntrega = dataEntrega;
		
	}
	public List<Usuario> getUsuarios() {
		return usuarios;
	}
	public void setUsuarios(List<Usuario> usuarios) {
		this.usuarios = usuarios;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	


}
