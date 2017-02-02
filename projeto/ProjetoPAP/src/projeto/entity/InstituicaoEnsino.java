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
public class InstituicaoEnsino {
	
	// tag para indicar o id da classe
	@Id
	// indica para que o id seja criado automaticamente.
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idInstituicao;
	private String nomeInstituicao;
	@ManyToOne
	private Cidade cidadeInstituicao;
	
	public int getIdInstituicao() {
		return idInstituicao;
	}
	public void setIdInstituicao(int idInstituicao) {
		this.idInstituicao = idInstituicao;
	}
	public String getNomeInstituicao() {
		return nomeInstituicao;
	}
	public void setNomeInstituicao(String nomeInstituicao) {
		this.nomeInstituicao = nomeInstituicao;
	}
	public Cidade getCidadeInstituicao() {
		return cidadeInstituicao;
	}
	public void setCidadeInstituicao(Cidade cidadeInstituicao) {
		this.cidadeInstituicao = cidadeInstituicao;
	}

}
