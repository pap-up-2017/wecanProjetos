package projeto.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class AprovacaoParticipante {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private int idProjeto;
	private int idUsuarioSolicitante;
	private Date dataCriacao;
	private String status; //Aguardando Aprovação / Aprovado / Recusado 
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getIdUsuarioSolicitante() {
		return idUsuarioSolicitante;
	}
	public void setIdUsuarioSolicitante(int idUsuarioSolicitante) {
		this.idUsuarioSolicitante = idUsuarioSolicitante;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public int getIdProjeto() {
		return idProjeto;
	}
	public void setIdProjeto(int idProjeto) {
		this.idProjeto = idProjeto;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}

	
	
}
