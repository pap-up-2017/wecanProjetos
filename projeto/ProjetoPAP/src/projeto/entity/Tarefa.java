package projeto.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate reconhecer que deve mapear essa classe
@Entity
@org.hibernate.annotations.Entity(
		dynamicUpdate = true
)
public class Tarefa {
	
	// tag para indicar o id da classe
	@Id
	// indica para que o id seja criado automaticamente.
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idTarefa;
	private String nomeTarefa;
	@Column(columnDefinition = "TEXT")
	private String descricaoTarefa;
	private Date dataCriacao;
	private Date prazoEntrega;
	private String statusTarefa;
	@ManyToOne
	private Projeto projetoTarefa;
	@ManyToOne
	private Usuario usuarioModificacao;
	
	public int getIdTarefa() {
		return idTarefa;
	}
	public void setIdTarefa(int idTarefa) {
		this.idTarefa = idTarefa;
	}
	public String getNomeTarefa() {
		return nomeTarefa;
	}
	public void setNomeTarefa(String nomeTarefa) {
		this.nomeTarefa = nomeTarefa;
	}
	public String getDescricaoTarefa() {
		return descricaoTarefa;
	}
	public void setDescricaoTarefa(String descricaoTarefa) {
		this.descricaoTarefa = descricaoTarefa;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public Date getPrazoEntrega() {
		return prazoEntrega;
	}
	public void setPrazoEntrega(Date prazoEntrega) {
		this.prazoEntrega = prazoEntrega;
	}
	public String getStatusTarefa() {
		return statusTarefa;
	}
	public void setStatusTarefa(String statusTarefa) {
		this.statusTarefa = statusTarefa;
	}
	public Projeto getProjetoTarefa() {
		return projetoTarefa;
	}
	public void setProjetoTarefa(Projeto projetoTarefa) {
		this.projetoTarefa = projetoTarefa;
	}
	public Usuario getUsuarioModificacao() {
		return usuarioModificacao;
	}
	public void setUsuarioModificacao(Usuario usuarioModificacao) {
		this.usuarioModificacao = usuarioModificacao;
	}	

}
