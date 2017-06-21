package projeto.entity;

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
public class ComentarioUsuario {
	// id classe
	@Id
	// gerador automatico de id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idComentario;
	
	private String comentario;
	@ManyToOne
	private Usuario enviaComentario;
	@ManyToOne
	private Usuario recebeComentario;
	@ManyToOne
	private Projeto projetoComentario;
	
	public int getIdComentario() {
		return idComentario;
	}
	public void setIdComentario(int idComentario) {
		this.idComentario = idComentario;
	}
	public String getComentario() {
		return comentario;
	}
	public void setComentario(String comentario) {
		this.comentario = comentario;
	}
	public Usuario getEnviaComentario() {
		return enviaComentario;
	}
	public void setEnviaComentario(Usuario enviaComentario) {
		this.enviaComentario = enviaComentario;
	}
	public Usuario getRecebeComentario() {
		return recebeComentario;
	}
	public void setRecebeComentario(Usuario recebeComentario) {
		this.recebeComentario = recebeComentario;
	}
	public Projeto getProjetoComentario() {
		return projetoComentario;
	}
	public void setProjetoComentario(Projeto projetoComentario) {
		this.projetoComentario = projetoComentario;
	}
}
