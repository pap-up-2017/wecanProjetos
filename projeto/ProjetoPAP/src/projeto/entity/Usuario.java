package projeto.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.xml.bind.annotation.XmlRootElement;

//rest
@XmlRootElement
//hibernate
@Entity
public class Usuario {
	
	// tag hibernate
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idUsuario;
	private String nomeUsuario;
	private String usernameUsuario;
	private String emailUsuario;
	private String senhaUsuario;
	@ManyToOne
	private TipoUsuario tipoUsuario;
	@ManyToOne
	private Cidade cidadeUsuario;
	@ManyToOne
	private InstituicaoEnsino instituicaoUsuario;
	@ManyToOne
	private Curso cursoUsuario;
	
	public int getIdUsuario() {
		return idUsuario;
	}
	public void setIdUsuario(int idUsuario) {
		this.idUsuario = idUsuario;
	}
	public String getNomeUsuario() {
		return nomeUsuario;
	}
	public void setNomeUsuario(String nomeUsuario) {
		this.nomeUsuario = nomeUsuario;
	}
	public String getUsernameUsuario() {
		return usernameUsuario;
	}
	public void setUsernameUsuario(String usernameUsuario) {
		this.usernameUsuario = usernameUsuario;
	}
	public String getEmailUsuario() {
		return emailUsuario;
	}
	public void setEmailUsuario(String emailUsuario) {
		this.emailUsuario = emailUsuario;
	}
	public String getSenhaUsuario() {
		return senhaUsuario;
	}
	public void setSenhaUsuario(String senhaUsuario) {
		this.senhaUsuario = senhaUsuario;
	}
	public TipoUsuario getTipoUsuario() {
		return tipoUsuario;
	}
	public void setTipoUsuario(TipoUsuario tipoUsuario) {
		this.tipoUsuario = tipoUsuario;
	}
	public Cidade getCidadeUsuario() {
		return cidadeUsuario;
	}
	public void setCidadeUsuario(Cidade cidadeUsuario) {
		this.cidadeUsuario = cidadeUsuario;
	}
	public InstituicaoEnsino getInstituicaoUsuario() {
		return instituicaoUsuario;
	}
	public void setInstituicaoUsuario(InstituicaoEnsino instituicaoUsuario) {
		this.instituicaoUsuario = instituicaoUsuario;
	}
	public Curso getCursoUsuario() {
		return cursoUsuario;
	}
	public void setCursoUsuario(Curso cursoUsuario) {
		this.cursoUsuario = cursoUsuario;
	}
}
