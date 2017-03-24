package projeto.entity;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//tag para o hibernate
@Entity
public class UsuarioLogado {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private int idUsuarioLogado;
	private Date dataCriacao;
	private String token;
	@ManyToOne
	private TipoUsuario tipoUsuarioLogado;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getIdUsuarioLogado() {
		return idUsuarioLogado;
	}
	public void setIdUsuarioLogado(int idUsuarioLogado) {
		this.idUsuarioLogado = idUsuarioLogado;
	}
	public Date getDataCriacao() {
		return dataCriacao;
	}
	public void setDataCriacao(Date dataCriacao) {
		this.dataCriacao = dataCriacao;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public TipoUsuario getTipoUsuarioLogado() {
		return tipoUsuarioLogado;
	}
	public void setTipoUsuarioLogado(TipoUsuario tipoUsuarioLogado) {
		this.tipoUsuarioLogado = tipoUsuarioLogado;
	}

}
