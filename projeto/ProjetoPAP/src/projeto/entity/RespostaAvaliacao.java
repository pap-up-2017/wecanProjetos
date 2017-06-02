package projeto.entity;

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
public class RespostaAvaliacao {
	
	// tag para indicar o id da classe
	@Id
	// geração de ids
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int idRespostaAvaliacao;
	private String textoRespostaAvaliacao;
	private String statusRespostaAvaliacao;	
	@OneToOne	
	private Exercicio exercicio;

	public int getIdRespostaAvaliacao() {
		return idRespostaAvaliacao;
	}

	public void setIdRespostaAvaliacao(int idRespostaAvaliacao) {
		this.idRespostaAvaliacao = idRespostaAvaliacao;
	}

	public String getTextoRespostaAvaliacao() {
		return textoRespostaAvaliacao;
	}

	public void setTextoRespostaAvaliacao(String textoRespostaAvaliacao) {
		this.textoRespostaAvaliacao = textoRespostaAvaliacao;
	}

	public String getStatusRespostaAvaliacao() {
		return statusRespostaAvaliacao;
	}

	public void setStatusRespostaAvaliacao(String statusRespostaAvaliacao) {
		this.statusRespostaAvaliacao = statusRespostaAvaliacao;
	}

	public Exercicio getExercicio() {
		return exercicio;
	}

	public void setExercicio(Exercicio exercicio) {
		this.exercicio = exercicio;
	}
	
}
