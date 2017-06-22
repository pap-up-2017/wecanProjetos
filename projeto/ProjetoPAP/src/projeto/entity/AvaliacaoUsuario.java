package projeto.entity;

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
public class AvaliacaoUsuario {
		
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id;
	private int notaAvaliacao;
	
	@ManyToOne
	private ItemAvaliacaoUsuario itemAvaliado;
	@ManyToOne
	private Usuario usuarioAvaliador;
	@ManyToOne
	private Usuario usuarioAvaliado;
	@ManyToOne
	private Projeto projeto;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public ItemAvaliacaoUsuario getItemAvaliado() {
		return itemAvaliado;
	}
	public void setItemAvaliado(ItemAvaliacaoUsuario itemAvaliado) {
		this.itemAvaliado = itemAvaliado;
	}
	public Usuario getUsuarioAvaliador() {
		return usuarioAvaliador;
	}
	public void setUsuarioAvaliador(Usuario usuarioAvaliador) {
		this.usuarioAvaliador = usuarioAvaliador;
	}
	public int getNotaAvaliacao() {
		return notaAvaliacao;
	}
	public void setNotaAvaliacao(int notaAvaliacao) {
		this.notaAvaliacao = notaAvaliacao;
	}
	public Usuario getUsuarioAvaliado() {
		return usuarioAvaliado;
	}
	public void setUsuarioAvaliado(Usuario usuarioAvaliado) {
		this.usuarioAvaliado = usuarioAvaliado;
	}
	public Projeto getProjeto() {
		return projeto;
	}
	public void setProjeto(Projeto projeto) {
		this.projeto = projeto;
	}
}
