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
@org.hibernate.annotations.Entity(
		dynamicUpdate = true
)
public class Notificacao {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idNotificacao;	
	private String tituloNotificacao;
	private String textoNotificacao;
	private String linkAcessoNotificacao;
	private Date dataNotificacao;
	private String statusNotificacao; // Lida/Não lida
	private Date dataLeirutaNotificacao;
	@OneToOne
	private Usuario usuario;
	
	public int getIdNotificacao() {
		return idNotificacao;
	}
	public void setIdNotificacao(int idNotificacao) {
		this.idNotificacao = idNotificacao;
	}
	public String getTituloNotificacao() {
		return tituloNotificacao;
	}
	public void setTituloNotificacao(String tituloNotificacao) {
		this.tituloNotificacao = tituloNotificacao;
	}
	public String getTextoNotificacao() {
		return textoNotificacao;
	}
	public void setTextoNotificacao(String textoNotificacao) {
		this.textoNotificacao = textoNotificacao;
	}
	public String getLinkAcessoNotificacao() {
		return linkAcessoNotificacao;
	}
	public void setLinkAcessoNotificacao(String linkAcessoNotificacao) {
		this.linkAcessoNotificacao = linkAcessoNotificacao;
	}
	public Date getDataNotificacao() {
		return dataNotificacao;
	}
	public void setDataNotificacao(Date dataNotificacao) {
		this.dataNotificacao = dataNotificacao;
	}
	public Usuario getUsuario() {
		return usuario;
	}
	public void setUsuario(Usuario usuario) {
		this.usuario = usuario;
	}
	public String getStatusNotificacao() {
		return statusNotificacao;
	}
	public void setStatusNotificacao(String statusNotificacao) {
		this.statusNotificacao = statusNotificacao;
	}
	public Date getDataLeirutaNotificacao() {
		return dataLeirutaNotificacao;
	}
	public void setDataLeirutaNotificacao(Date dataLeirutaNotificacao) {
		this.dataLeirutaNotificacao = dataLeirutaNotificacao;
	}
	
	
}
