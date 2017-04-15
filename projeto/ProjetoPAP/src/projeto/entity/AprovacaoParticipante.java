package projeto.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class AprovacaoParticipante {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	//Dono do projeto
	@OneToOne
	private Projeto idProjeto; 
	@OneToOne
	private Usuario idUsuarioSolicitante;
	private Date dataCriacao;
	private String status; //Aguardando Aprovação / Aprovado / Recusado 
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public Usuario getIdUsuarioSolicitante() {
		return idUsuarioSolicitante;
	}
	public void setIdUsuarioSolicitante(Usuario idUsuarioSolicitante) {
		this.idUsuarioSolicitante = idUsuarioSolicitante;
	}

	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Projeto getIdProjeto() {
		return idProjeto;
	}
	public void setIdProjeto(Projeto idProjeto) {
		this.idProjeto = idProjeto;
	}

	
	
}
