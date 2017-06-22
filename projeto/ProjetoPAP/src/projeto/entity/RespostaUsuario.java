package projeto.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class RespostaUsuario {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idRespostaUsuario;
	
	@OneToOne	
	private Usuario usuario;
	
	@OneToOne	
	private RespostaAvaliacao respostaAvaliacao;

	private Date dataResposta;
	
	private String statusRespostaUsuario;
	
	

	public int getIdRespostaUsuario() {
		return idRespostaUsuario;
	}

	public void setIdRespostaUsuario(int idRespostaUsuario) {
		this.idRespostaUsuario = idRespostaUsuario;
	}

	public Usuario getUsuario() {
		return usuario;
	}

	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}

	public RespostaAvaliacao getRespostaAvaliacao() {
		return respostaAvaliacao;
	}

	public void setRespostaAvaliacao(RespostaAvaliacao respostaAvaliacao) {
		this.respostaAvaliacao = respostaAvaliacao;
	}

	public Date getDataResposta() {
		return dataResposta;
	}

	public void setDataResposta(Date dataResposta) {
		this.dataResposta = dataResposta;
	}

	public String getStatusRespostaUsuario() {
		return statusRespostaUsuario;
	}

	public void setStatusRespostaUsuario(String statusRespostaUsuario) {
		this.statusRespostaUsuario = statusRespostaUsuario;
	}
	
}
